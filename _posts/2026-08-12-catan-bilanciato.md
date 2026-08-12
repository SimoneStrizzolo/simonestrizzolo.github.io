---
layout: post
title: "Bilanciare una board di Catan"
author: "Simone Strizzolo"
categories: tech
tags: [math, tech, nerd]
image: catan/catan3d.jpg
---

# Contesto

Catan è uno dei giochi da tavolo più importanti di sempre, e una parte importante del suo fascino è la randomicità della plancia. Il rovescio della medaglia è che capita spesso di sentire "che schifo di mappa!" appena finito di piazzare le tessere. Mi sono quindi chiesto: quando una board è davvero "buona" e quando non lo è?

# Letteratura

Qualcuno, ovviamente, ci aveva già pensato prima di me: [What is a balanced Catan board? – Board Game Analysis](https://www.boardgameanalysis.com/what-is-a-balanced-catan-board/#balanced-catan-boards). L'idea di base è quella di definire un insieme di metriche che, messe insieme, descrivano quanto una board è equilibrata.

Le metriche in questione:

- si divide la mappa di Catan in 6 fette, usando tre linee immaginarie;

- **Resource distribution on the island**: per ogni linea, si calcola quante volte compare ciascuna risorsa a sinistra e a destra, e se ne prende il quadrato della differenza. Si ripete per tutte e tre le linee: più basso il numero, meglio è;

- **Resource clustering**: ogni volta che due tessere della stessa risorsa sono adiacenti, si aggiungono 5 punti di penalità. Anche qui, più basso è meglio;

- **Probability distribution per resource**: è la probabilità che, tirando i dadi, esca proprio quella risorsa. Dipende sia dalla frequenza di uscita dei numeri sia da quante tessere di quella risorsa sono presenti sulla board;

- **Probability distribution della board**: assime al successivo, sono probabilmente i KPI più interessanti, perché garantiscono che i numeri sulla board siano distribuiti in modo uniforme. È concettualmente identico alla precedente, ma applicato ai numeri lungo le tre linee;

- **Number clustering**: assegna 5 punti di penalità ogni volta che due tessere adiacenti hanno lo stesso numero, per evitare che numeri "buoni" si concentrino tutti nella stessa zona.

L'autore usa anche una metrica sui porti, che invece a me non interessava.

Da queste metriche normalizzate, l'autore ricava un unico indice medio: il **CIBI**, Catan Island Balance Index. Per trovare le board migliori ha poi lanciato un algoritmo di generazione casuale, arrivando a valutare circa 100 milioni di mappe.

Qui un paio di esempi di plancia ben bilanciata e mal bilanciata:

<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:16px;">
  <div style="text-align:center;">
    <img src="/assets/img/catan/catan-board-4p-top.svg" alt="Board Catan 4 giocatori mal bilanciata" style="width:100%">
    <br><small>Board mal bilanciata</small>
  </div>
  <div style="text-align:center;">
    <img src="/assets/img/catan/catan-board-4p-bad.svg" alt="Board Catan 4 giocatori ben bilanciata" style="width:100%">
    <br><small>Board ben bilanciata</small>
  </div>
</div>

## Estensione a 5/6 giocatori

Ho fatto la stessa cosa, ma per la mappa a sei giocatori! Quella "ufficiale" ha 2 deserti, io ne ho messi 4 perché mi servivano per un'altra variante del gioco. Non potevo aspettare di generare 100 milioni di board come nell'articolo originale, quindi mi sono fermato a 1 milione di iterazioni. Su quel risultato ho poi applicato un local-search: ho preso la board migliore trovata e ho iniziato a scambiare qualche numero e qualche tessera. È stato un gran bel tocco, perché ha abbassato il CIBI del 77,5% rispetto al punto di partenza.

Qui le mappe che ho ottenuto.

<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:16px;">
  <div style="text-align:center;">
    <img src="/assets/img/catan/catan-board-6p-rank1.svg" alt="Migliore board Catan a 6 giocatori" style="width:100%">
    <br><small>1° posto (CIBI 0.017)</small>
  </div>
  <div style="text-align:center;">
    <img src="/assets/img/catan/catan-board-6p-rank2.svg" alt="Seconda miglior board Catan a 6 giocatori" style="width:100%">
    <br><small>2° posto (CIBI 0.019)</small>
  </div>
  <div style="text-align:center;">
    <img src="/assets/img/catan/catan-board-6p-rank3.svg" alt="Terza miglior board Catan a 6 giocatori" style="width:100%">
    <br><small>3° posto (CIBI 0.019)</small>
  </div>
</div>

## Codice usato

Qui il codice che mi ha generato Claude. È un po' slop ma pace. Ho appena resettato il pc quindi ho deciso di farlo in PowerShell.

```powershell
param(
    [int] $MaxIterations = 1000,
    [string] $OutputDirectory = ".",
    [double] $InitialThreshold = 0.5,
    [Nullable[int]] $Seed = $null
)

if ($null -ne $Seed) {
    Get-Random -SetSeed $Seed | Out-Null
    Write-Host "[SEED] Random seed impostato: $Seed" -ForegroundColor DarkGray
}

function New-BoardLayout {
    $hexes = @()
    $rowLengths = @(3, 4, 5, 6, 5, 4, 3)

    for ($row = 0; $row -lt $rowLengths.Length; $row++) {
        for ($col = 0; $col -lt $rowLengths[$row]; $col++) {
            $hexes += @{ Row = $row; Col = $col; Resource = $null; Number = $null }
        }
    }

    $hexIndex = @{}
    foreach ($hex in $hexes) {
        $hexIndex["$($hex.Row),$($hex.Col)"] = $hex
    }

    $board = @{
        Hexes = $hexes
        HexIndex = $hexIndex
        ResourceCounts = @{ Forest = 0; Brick = 0; Wheat = 0; Sheep = 0; Ore = 0; Desert = 0 }
        NumberCounts = @{}
        Metrics = @{}
    }

    $desertPositions = @( @(2, 1), @(2, 3), @(4, 1), @(4, 3) )

    foreach ($pos in $desertPositions) {
        $hex = $board.Hexes | Where-Object { $_.Row -eq $pos[0] -and $_.Col -eq $pos[1] }
        if ($hex) {
            $hex.Resource = "Desert"
            $hex.Number = 0
            $board.ResourceCounts["Desert"]++
        }
    }

    return $board
}

function Get-HexAt {
    param([hashtable] $Board, [int] $Row, [int] $Col)
    return $Board.HexIndex["$Row,$Col"]
}

function Get-AdjacentHexPositions {
    param([hashtable] $Board, [int] $Row, [int] $Col)

    $adjacent = @()
    if ($Row % 2 -eq 0) {
        $deltas = @( @(-1, -1), @(-1, 0), @(0, -1), @(0, 1), @(1, -1), @(1, 0) )
    } else {
        $deltas = @( @(-1, 0), @(-1, 1), @(0, -1), @(0, 1), @(1, 0), @(1, 1) )
    }

    foreach ($delta in $deltas) {
        $newRow = $Row + $delta[0]
        $newCol = $Col + $delta[1]
        $hex = Get-HexAt $Board $newRow $newCol
        if ($hex) { $adjacent += @{Row = $newRow; Col = $newCol} }
    }

    return $adjacent
}

function Invoke-FisherYatesShuffle {
    param([object[]] $Array)

    if ($Array.Count -le 1) { return $Array }

    $shuffled = $Array.Clone()
    for ($i = $shuffled.Count - 1; $i -gt 0; $i--) {
        $j = Get-Random -Minimum 0 -Maximum ($i + 1)
        $temp = $shuffled[$i]
        $shuffled[$i] = $shuffled[$j]
        $shuffled[$j] = $temp
    }
    return $shuffled
}

function Copy-Board {
    param([hashtable] $Board)

    $newHexes = @()
    foreach ($hex in $Board.Hexes) {
        $newHexes += @{
            Row = $hex.Row
            Col = $hex.Col
            Resource = $hex.Resource
            Number = $hex.Number
        }
    }

    $hexIndex = @{}
    foreach ($hex in $newHexes) {
        $hexIndex["$($hex.Row),$($hex.Col)"] = $hex
    }

    return @{
        Hexes = $newHexes
        HexIndex = $hexIndex
        ResourceCounts = $Board.ResourceCounts.Clone()
        NumberCounts = @{}
        Metrics = @{}
    }
}

function New-RandomBoard {
    param([hashtable] $TemplateBoard)

    $board = Copy-Board $TemplateBoard

    $availablePositions = @()
    foreach ($hex in $board.Hexes) {
        if ($hex.Resource -ne "Desert") {
            $availablePositions += @{Row = $hex.Row; Col = $hex.Col}
        }
    }

    $resources = @()
    $resources += @("Forest") * 5
    $resources += @("Brick") * 5
    $resources += @("Sheep") * 6
    $resources += @("Wheat") * 5
    $resources += @("Ore") * 5

    $resources = Invoke-FisherYatesShuffle $resources

    for ($i = 0; $i -lt $resources.Count; $i++) {
        $pos = $availablePositions[$i]
        $hex = Get-HexAt $board $pos.Row $pos.Col
        $hex.Resource = $resources[$i]
        $board.ResourceCounts[$resources[$i]]++
    }

    $numbers = [System.Collections.ArrayList]@(2)
    $numbers.AddRange(@(3, 4, 5, 6, 8, 9, 10, 11, 3, 4, 5, 6, 8, 9, 10, 11, 3, 4, 5, 6, 8, 9, 10, 11, 12))
    $positions = Invoke-FisherYatesShuffle @($availablePositions)

    $assignedCount = 0
    foreach ($pos in $positions) {
        $hex = Get-HexAt $board $pos.Row $pos.Col
        if ($hex.Number -ne $null) { continue }

        $canPlace = $false
        for ($attempt = 0; $attempt -lt 10; $attempt++) {
            if ($numbers.Count -eq 0) { break }
            $idx = Get-Random -Minimum 0 -Maximum $numbers.Count
            $num = $numbers[$idx]

            $valid = $true
            if ($num -eq 6 -or $num -eq 8) {
                $adjacent = Get-AdjacentHexPositions $board $hex.Row $hex.Col
                foreach ($adj in $adjacent) {
                    $adjHex = Get-HexAt $board $adj.Row $adj.Col
                    if ($adjHex.Number -in @(6, 8)) {
                        $valid = $false
                        break
                    }
                }
            }

            if ($valid) {
                $hex.Number = $num
                if (-not $board.NumberCounts.ContainsKey($num)) {
                    $board.NumberCounts[$num] = 0
                }
                $board.NumberCounts[$num]++
                [void]$numbers.RemoveAt($idx)
                $canPlace = $true
                $assignedCount++
                break
            }
        }
    }

    if ($assignedCount -lt 26) { return $null }
    return $board
}

function Measure-BalanceScore {
    param([hashtable] $Board)

    $score1 = Get-ResourceDistributionScore $Board
    $score2 = Get-ResourceClusteringScore $Board
    $score3 = Get-ProbabilityDistributionScore $Board
    $score4 = Get-NumberClusteringScore $Board
    $score5 = Get-ProbabilityPerResourceScore $Board

    $finalScore = ($score1 + $score2 + $score3 + $score4 + $score5) / 5

    $Board.Metrics = @{
        ResourceDistribution = $score1
        ResourceClustering = $score2
        ProbabilityDistribution = $score3
        NumberClustering = $score4
        ProbabilityPerResource = $score5
        Final = $finalScore
    }

    return $finalScore
}

function Get-HexGeometricX {
    param([int] $Row, [int] $Col)
    $rowLengths = @(3, 4, 5, 6, 5, 4, 3)
    return $Col + (6 - $rowLengths[$Row]) / 2.0
}

function Get-ResourceDistributionScore {
    param([hashtable] $Board)

    $score = 0
    $leftResources = @{}
    $rightResources = @{}

    foreach ($hex in $Board.Hexes) {
        if ($hex.Resource -eq "Desert") { continue }
        $geomX = Get-HexGeometricX $hex.Row $hex.Col
        if ($geomX -lt 2.5) {
            if (-not $leftResources.ContainsKey($hex.Resource)) { $leftResources[$hex.Resource] = 0 }
            $leftResources[$hex.Resource]++
        } else {
            if (-not $rightResources.ContainsKey($hex.Resource)) { $rightResources[$hex.Resource] = 0 }
            $rightResources[$hex.Resource]++
        }
    }

    foreach ($resource in $leftResources.Keys) {
        $right = if ($rightResources.ContainsKey($resource)) { $rightResources[$resource] } else { 0 }
        $diff = $leftResources[$resource] - $right
        $score += $diff * $diff
    }

    return [math]::Min($score / 100, 1.0)
}

function Get-ResourceClusteringScore {
    param([hashtable] $Board)

    $clusterCount = 0

    foreach ($hex in $Board.Hexes) {
        if ($hex.Resource -eq "Desert") { continue }
        $adjacent = Get-AdjacentHexPositions $Board $hex.Row $hex.Col
        foreach ($adj in $adjacent) {
            $adjHex = Get-HexAt $Board $adj.Row $adj.Col
            if ($adjHex -and $adjHex.Resource -eq $hex.Resource) {
                $clusterCount += 5
            }
        }
    }

    $clusterCount = $clusterCount / 2
    return [math]::Min($clusterCount / 60, 1.0)
}

function Get-ProbabilityDistributionScore {
    param([hashtable] $Board)

    $probabilities = @{
        2 = 1/36; 3 = 2/36; 4 = 3/36; 5 = 4/36; 6 = 5/36
        8 = 5/36; 9 = 4/36; 10 = 3/36; 11 = 2/36; 12 = 1/36
    }

    $leftProb = 0
    $rightProb = 0
    $totalProb = 0

    foreach ($hex in $Board.Hexes) {
        if ($hex.Number -gt 0) {
            if ($probabilities.ContainsKey($hex.Number)) {
                $prob = $probabilities[$hex.Number]
                $totalProb += $prob
                $geomX = Get-HexGeometricX $hex.Row $hex.Col
                if ($geomX -lt 2.5) {
                    $leftProb += $prob
                } else {
                    $rightProb += $prob
                }
            }
        }
    }

    if ($totalProb -eq 0) { return 0 }
    $diff = [math]::Abs($leftProb - $rightProb)
    return [math]::Min($diff / $totalProb, 1.0)
}

function Get-NumberClusteringScore {
    param([hashtable] $Board)

    $score = 0

    foreach ($hex in $Board.Hexes) {
        if ($hex.Number -notin @(6, 8)) { continue }
        $adjacent = Get-AdjacentHexPositions $Board $hex.Row $hex.Col
        foreach ($adj in $adjacent) {
            $adjHex = Get-HexAt $Board $adj.Row $adj.Col
            if ($adjHex -and $adjHex.Number -in @(6, 8)) {
                if (($hex.Number -eq 6 -and $adjHex.Number -eq 8) -or ($hex.Number -eq 8 -and $adjHex.Number -eq 6)) {
                    $score += 10
                } elseif ($hex.Number -eq $adjHex.Number) {
                    $score += 3
                } else {
                    $score += 1
                }
            }
        }
    }

    $score = $score / 2
    return [math]::Min($score / 30, 1.0)
}

function Get-ProbabilityPerResourceScore {
    param([hashtable] $Board)

    $probabilities = @{
        2 = 1/36; 3 = 2/36; 4 = 3/36; 5 = 4/36; 6 = 5/36
        8 = 5/36; 9 = 4/36; 10 = 3/36; 11 = 2/36; 12 = 1/36
    }

    $resourceProbs = @{ Forest = 0; Brick = 0; Wheat = 0; Sheep = 0; Ore = 0 }

    foreach ($hex in $Board.Hexes) {
        if ($hex.Number -gt 0 -and $probabilities.ContainsKey($hex.Number)) {
            $resourceProbs[$hex.Resource] += $probabilities[$hex.Number]
        }
    }

    $probValues = @($resourceProbs.Values)
    $minProb = ($probValues | Measure-Object -Minimum).Minimum
    $maxProb = ($probValues | Measure-Object -Maximum).Maximum

    if ($maxProb -eq 0) { return 1.0 }

    $imbalance = ($maxProb - $minProb) / $maxProb
    return [math]::Min($imbalance, 1.0)
}

function ConvertTo-BoardVisualization {
    param([hashtable] $Board)

    $viz = ""
    $rowLengths = @(3, 4, 5, 6, 5, 4, 3)

    for ($row = 0; $row -lt $rowLengths.Length; $row++) {
        $indent = " " * (6 - $rowLengths[$row])
        $viz += $indent

        for ($col = 0; $col -lt $rowLengths[$row]; $col++) {
            $hex = Get-HexAt $Board $row $col

            if (-not $hex) {
                $viz += "[  ?  ] "
            } elseif ($hex.Resource -eq "Desert") {
                $viz += "[  D  ] "
            } else {
                $abbr = @{ Forest = "F"; Brick = "B"; Wheat = "W"; Sheep = "S"; Ore = "O" }[$hex.Resource]
                if (-not $abbr) { $abbr = "X" }
                $num = "$($hex.Number)".PadLeft(2)
                $viz += "[$abbr$num] "
            }
        }

        $viz += "`r`n"
    }

    return $viz
}

Write-Host "==== Generatore Board Catan Bilanciate ====" -ForegroundColor Cyan
Write-Host "Layout: 3-4-5-6-5-4-3 (30 hex)"
Write-Host "Risorse: 5F, 5B, 6S, 5W, 5O, 4D"
Write-Host "Numeri: 1x2, 3x(3-6,8-11), 1x12"
Write-Host ""

$templateBoard = New-BoardLayout
$desertCount = ($templateBoard.Hexes | Where-Object { $_.Resource -eq "Desert" }).Count

if ($templateBoard.Hexes.Count -ne 30 -or $desertCount -ne 4) {
    Write-Error "Layout non valido!"
    exit
}

Write-Host "[OK] Layout valido" -ForegroundColor Green
Write-Host ""

$top5Boards = [System.Collections.ArrayList]@()
$iteration = 0
$emptyIterations = 0
$threshold = $InitialThreshold
$startTime = Get-Date

Write-Host "Generazione in corso..."

while ($iteration -lt $MaxIterations) {
    $iteration++

    $board = New-RandomBoard $templateBoard
    if ($null -eq $board) {
        $emptyIterations++
        continue
    }

    $score = Measure-BalanceScore $board

    if ($score -lt $threshold) {
        $board.Score = $score
        [void]$top5Boards.Add($board)
        $top5Boards = [System.Collections.ArrayList]@($top5Boards | Sort-Object -Property Score)

        if ($top5Boards.Count -gt 5) {
            while ($top5Boards.Count -gt 5) {
                [void]$top5Boards.RemoveAt($top5Boards.Count - 1)
            }
        }
        $emptyIterations = 0
        Write-Host "[OK] Board #$($top5Boards.Count) trovata (score: $([math]::Round($score, 4)))" -ForegroundColor Green
    } else {
        $emptyIterations++
    }

    if ($emptyIterations -gt 200) {
        $threshold = $threshold * 1.1
        $emptyIterations = 0
        Write-Host "[WARN] Threshold aumentato a $([math]::Round($threshold, 4))" -ForegroundColor Yellow
    }

    if ($iteration % 100 -eq 0) {
        $elapsed = (Get-Date) - $startTime
        $rate = $iteration / $elapsed.TotalSeconds
        Write-Host "[TIME] Iter $iteration | Top5: $($top5Boards.Count) | Rate: $([math]::Round($rate, 1)) it/s"
    }
}

$elapsed = (Get-Date) - $startTime

Write-Host ""
Write-Host "[DONE] Completato!" -ForegroundColor Green
Write-Host "Iterazioni: $iteration"
Write-Host "Top 5 trovate: $($top5Boards.Count)"
Write-Host "Tempo: $([math]::Round($elapsed.TotalSeconds, 1))s"
Write-Host ""

$outputFile = Join-Path $OutputDirectory "top_5_boards.json"

$jsonData = @{
    GenerationTime = $elapsed.TotalSeconds
    TotalIterations = $iteration
    Top5Count = $top5Boards.Count
    Boards = @()
}

for ($i = 0; $i -lt $top5Boards.Count; $i++) {
    $board = $top5Boards[$i]
    $score = $board.Score

    $layout = @()
    foreach ($hex in $board.Hexes) {
        $layout += @{ Row = $hex.Row; Col = $hex.Col; Resource = $hex.Resource; Number = $hex.Number }
    }

    $boardData = @{
        Rank = $i + 1
        Score = [math]::Round($score, 6)
        Metrics = @{
            ResourceDistribution = [math]::Round($board.Metrics.ResourceDistribution, 6)
            ResourceClustering = [math]::Round($board.Metrics.ResourceClustering, 6)
            ProbabilityDistribution = [math]::Round($board.Metrics.ProbabilityDistribution, 6)
            NumberClustering = [math]::Round($board.Metrics.NumberClustering, 6)
            ProbabilityPerResource = [math]::Round($board.Metrics.ProbabilityPerResource, 6)
            Final = [math]::Round($board.Metrics.Final, 6)
        }
        Layout = $layout
    }

    $jsonData.Boards += $boardData
}

$jsonData | ConvertTo-Json -Depth 10 | Out-File -FilePath $outputFile -Encoding UTF8
Write-Host "[SAVE] Salvato: $outputFile"

$jsFile = Join-Path $OutputDirectory "board-data.js"
$jsContent = "const BOARDS_DATA = " + ($jsonData | ConvertTo-Json -Depth 10 -Compress) + ";"
$jsContent | Out-File -FilePath $jsFile -Encoding UTF8
Write-Host "[SAVE] Salvato: $jsFile"

$vizFile = Join-Path $OutputDirectory "board_visualization.txt"
$vizContent = "VISUALIZZAZIONE TOP 5 BOARD`r`n" + ("=" * 60) + "`r`n`r`n"

for ($i = 0; $i -lt $top5Boards.Count; $i++) {
    $board = $top5Boards[$i]
    $score = $board.Score
    $vizContent += "BOARD #$($i + 1) - Score: $([math]::Round($score, 4))`r`n"
    $vizContent += (ConvertTo-BoardVisualization $board)
    $vizContent += "Metriche:`r`n"
    $vizContent += "  Resource Distribution: $([math]::Round($board.Metrics.ResourceDistribution, 4))`r`n"
    $vizContent += "  Resource Clustering: $([math]::Round($board.Metrics.ResourceClustering, 4))`r`n"
    $vizContent += "  Probability Distribution: $([math]::Round($board.Metrics.ProbabilityDistribution, 4))`r`n"
    $vizContent += "  Number Clustering: $([math]::Round($board.Metrics.NumberClustering, 4))`r`n"
    $vizContent += "  Probability Per Resource: $([math]::Round($board.Metrics.ProbabilityPerResource, 4))`r`n"
    $vizContent += "`r`n" + ("=" * 60) + "`r`n`r`n"
}

$vizContent | Out-File -FilePath $vizFile -Encoding UTF8
Write-Host "[SAVE] Salvato: $vizFile"
```
