<!-- TODO: Make game.html make a POST request with "score" and "date" (or primary id) inputs -->
<!-- TODO: Style with CSS -->

<!DOCTYPE html>
<html>
    <head>
        <title>Submit Score</title>
        <meta charset="utf-8">
        <!-- <link rel="stylesheet" href="start.css"> -->
    </head>
    <body>
        <?php
            if(!array_key_exists("score", $_POST)) {
                echo <<<LONG
        <h2 style="color: #d4341c;"> No score available! </h2>
        <p> Did you get to this page from playing the game? </p>
LONG;
            }
            else {
                echo "<h1> Type post[score] is " . gettype($_POST["score"]);
                echo <<<LONG
        <h2> Enter your initials </h2>
        <form id="initial-wrapper" action="./leaderboard.php" method="POST">
            <input type="text" maxlength="1" placeholder="-" id="first-initial">
            <input type="text" maxlength="1" placeholder="-">
            <input type="text" maxlength="1" placeholder="-">
LONG;
                echo "            <input type=\"hidden\" name=\"score\" value=\"" . $_POST["score"] . "\">";
                // TODO: uncomment when date is sent
                //echo "<input type=\"hidden\" name=\"date\" value=\"" . $_POST["date"] . "\">";
                echo "        </form>";
                echo "        <h2> Your Score </h2>";
                echo "        <p>" . $_POST["score"] . "</p>";
                echo "        <button type=\"submit\" form=\"initial-wrapper\">Confirm</button>"
            }
        ?>
        <button type="button" id="return-btn">Return to Main Page</button>
        <script src="./submit.js"></script>
    </body>
</html>