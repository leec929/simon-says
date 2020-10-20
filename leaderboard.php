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
                $conn = new mysqli("localhost", "cwlee", "", "test");
                if($conn->connect_error) {
                    print("<p>");
                    print("failed to connect to sql database <br> are you on comet.cs.brynmawr.edu?");
                    print("</p>");
                }
                print("POST has initials ${$_POST['first-initial']}, ${$_POST['second-initial']}, and ${$_POST['third-initial']}");
                // $ins_qry = "INSERT INTO cwlee_game_lb (initials, score, scoredate)";
                // $ins_qr .= " VALUES ($_POST[""])";
            }
        ?>
    </body>
</html>