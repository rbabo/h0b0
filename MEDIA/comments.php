<?php
  // Connect to the database
  $db = new mysqli('hostname', 'username', 'password', 'database_name');

  // Check if the form was submitted
  if (isset($_POST['comment'])) {
    // Get the comment text from the form
    $comment = $db->real_escape_string($_POST['comment']);

    // Insert the comment into the database
    $db->query("INSERT INTO comments (comment) VALUES ('$comment')");
  }
?>

<?php
  // Connect to the database
  $db = new mysqli('hostname', 'username', 'password', 'database_name');

  // Retrieve the comments from the database
  $result = $db->query("SELECT * FROM comments ORDER BY id DESC");

  // Iterate over the comments and display them on the page
  while ($row = $result->fetch_assoc()) {
    echo '<div class="comment"><p>' . $row['comment'] . '</p><p class="timestamp">' . $row['timestamp'] . '</p></div>';
  }
?>