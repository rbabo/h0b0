<?php 

include "config.php";

if (isset($_POST["post_comment"])){

    $name = $_POST["name"];
    $message = $_POST["message"];

    $sql = "INSERT INTO demo (name, message)
    VALUES ('$name' , '$message' )";
    
    if ($conn->query($sql) === TRUE) {
      echo "";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="../MEDIA/comment.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>h0b0_comments<3 </title>
</head>

<body>
    <div class="commentsWrapper">
        <div class="wrapper">
            <form action="" method="post" class="form">
                <input type="text" class="name" name="name" placeholder="Name">
                <br>
                <textarea name="message" cols="30" rows="10" class="message"
                    placeholder="Write Something :)"></textarea>
                <br>
                <button type="submit" class="btn" name="post_comment">Post Comment</button>
            </form>
        </div>
        <div class="content">
            <?php

        $sql = "SELECT * FROM demo";
        $result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    
?>
            <h3><?php echo $row["name"]; ?> </h3>
            <p><?php echo $row["message"]; ?> </p>
            <?php } } ?>
        </div>
    </div>
</body>

</html>