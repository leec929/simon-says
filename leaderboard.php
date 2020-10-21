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
        <!-- <link rel="stylesheet" href="start.css"> -->
    </head>
    <body>
        <?php
            if(!empty($_POST)) { // sending a new score to add to the database
                $initials = "{$_POST['first-initial']}{$_POST['second-initial']}{$_POST['third-initial']}";
                
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
                            print("<br> successfully entered the score!");
                        }
                    }
                }
            }
        ?>

        <table>
            <thead>
                <tr>
                    <td>rank</td>
                    <td>Initials</td>
                    <td>Score</td>
                    <td>Date Time</td>
                </tr>
            </thead>
            <tbody>
                <?php
                    $query = 'SELECT * FROM cwlee_game_leaderboard ORDER BY score DESC LIMIT 10;';
                    $result = $conn->query($query);
                    $rankCount = 1;
                    if($result) {
                        while($row = $result->fetch_row()) {
                            echo <<<LONG
                <tr>
                    <td>#${rankCount}</td>
                    <td>{$row[0]}</td>
                    <td>{$row[1]}</td>
                    <td>{$row[2]}</td>
                </tr>
LONG;
                    $rankCount++;
                        }
                    }
                ?>
            </tbody>
        </table>
    </body>
</html>