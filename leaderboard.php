<?php
    $conn = new mysqli("localhost", "cwlee", "", "test");
    if($conn->connect_error) {
        print("<p>");
        print("failed to connect to sql database <br> are you on comet.cs.brynmawr.edu?");
        print("</p>");
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Leaderboard</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="leaderboard.css">
        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Chilanka&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Neucha&display=swap" rel="stylesheet">
    </head>
    <body>
        <h1>Simons Game Leaderboard</h1>
        <?php
            function getInitial($initialInput) {
                if($initialInput == "") 
                    return "-";
                return $initialInput;
            }
            if(!empty($_POST)) { // sending a new score to add to the database
                $initials = getInitial($_POST['first-initial']) . getInitial($_POST['second-initial']) . getInitial($_POST['third-initial']); //"{$_POST['first-initial']}{$_POST['second-initial']}{$_POST['third-initial']}";
                
                $get_qry = "SELECT * FROM cwlee_game_leaderboard WHERE initials='$initials' AND score='{$_POST['score']}' AND '{$_POST['datetime']}'";
                if ($result = $conn->query($get_qry)) {
                    $numrows = $result->num_rows;
                    // print("num rows is $numrows");
                    // print($numrows == 0);
                    if($numrows == 0) {
                        // print("entered statement");
                        // print($initials);
                        // print("POST has initials " . $_POST["first-initial"] . ", " . $_POST["second-initial"] . ", and " . $_POST["third-initial"]);
                        // $datetime = date('Ymd H:i:s');
                        $ins_qry = "INSERT INTO cwlee_game_leaderboard (initials, score, playdatetime)";
                        $ins_qry .= " VALUES ('${initials}', '{$_POST['score']}', '{$_POST['datetime']}');";
                        // print("<br>insqry is $ins_qry");

                        $result = $conn->query($ins_qry);
                        // print("<br>result is \"$result\"");

                        if($result == 1) {
                            print("<h3>successfully entered the score!</h3>");
                        }
                    }
                }
            }
        ?>
        <table>
            <thead>
                <tr>
                    <td>Rank</td>
                    <td>Initials</td>
                    <td>Score</td>
                    <td>Date & Time</td>
                </tr>
            </thead>
            <tbody>
                <?php
                    $query = 'SELECT * FROM cwlee_game_leaderboard ORDER BY score DESC, playdatetime ASC;';
                    $result = $conn->query($query);
                    $rankCount = 1;
                    if($result) {
                        while($row = $result->fetch_row()) {
                            echo "                <tr>";
                            $inlineStyle = "";
                            if(!empty($_POST)) {
                                $initials = getInitial($_POST['first-initial']) . getInitial($_POST['second-initial']) . getInitial($_POST['third-initial']);
                                if($row[0] == $initials && $row[1] == $_POST["score"] && $row[2] == $_POST['datetime'])
                                    $inlineStyle = ' style="color: #267226;font-weight: bold;"';
                            }
                            echo "                    <td${inlineStyle}>#${rankCount}</td>";
                            echo "                    <td${inlineStyle}>{$row[0]}</td>";
                            echo "                    <td${inlineStyle}>{$row[1]}</td>";
                            echo "                    <td${inlineStyle}>{$row[2]}</td>";
                            echo "                </tr>";
                            $rankCount++;
                        }
                    }
                ?>
            </tbody>
        </table>
        <div class="btn-wrapper">
            <button type="button" onclick="location.href='./start.html'">Return to Main Page</button>
            <button type="button" id="load-more">Load More</button>
        </div>
        <script src="leaderboard.js" charset="utf-8"></script>
    </body>
</html>
<?php
    if($conn) {
        $conn->close();
    }
?>