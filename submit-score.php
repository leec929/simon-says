<!-- TODO: Make game.html make a POST request with "score" and "datetime" (or primary id) inputs -->
<!-- TODO: Style with CSS -->

<!DOCTYPE html>
<html>
    <head>
        <title>Submit Score</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="submit.css">
        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Chilanka&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Neucha&display=swap" rel="stylesheet">
    </head>
    <body>
        <?php
            if(!array_key_exists("score", $_POST)) {
                echo <<<LONG
        <h2 style="color: #d4341c;"> No score available! </h2>
        <p> Did you get to this page from playing the game? </p>
        <div class="buttons">
LONG;
            }
            else {
                echo <<<LONG
        <h2> Enter your initials </h2>
        <form id="initials-wrapper" action="http://comet.cs.brynmawr.edu/~cwlee/cs380-projects/leaderboard.php" method="POST">
            <input type="text" maxlength="1" name="first-initial" id="first-initial" placeholder="-">
            <input type="text" maxlength="1" name="second-initial" placeholder="-">
            <input type="text" maxlength="1" name="third-initial" placeholder="-">
LONG;
                echo "            <input type=\"hidden\" name=\"score\" value=\"" . $_POST["score"] . "\">";
                // TODO: uncomment when datetime is sent
                echo "<input type=\"hidden\" name=\"datetime\" value=\"" . $_POST["datetime"] . "\">";
                // echo "<br>datetime is \"" . $_POST["datetime"] . "\"<br>";
                echo "        </form>";
                echo "        <h2> Your Score </h2>";
                echo "        <p>" . $_POST["score"] . "</p>";
                echo "        <div class=\"buttons\">";
                echo "            <button type=\"submit\" form=\"initial-wrapper\">Confirm</button>";
            }
        ?>
            <button type="button" id="return-btn">Return to Main Page</button>
        </div>
        <script src="./submit.js"></script>
    </body>
</html>