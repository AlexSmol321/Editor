<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

if(htmlspecialchars($_SESSION["username"]) === "marko" || htmlspecialchars($_SESSION["username"]) === "Marko") {
  header("location: welcome-marko.php");
  exit;
}
require_once "config.php";


$posts = mysqli_query($link, "SELECT * FROM `projects`");
$posts = mysqli_fetch_all($posts);

?>
 <?php include('./header.php') ?>
<section id="welcome">
    <h1>Hei <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>! Nyt puuhaillaan.</h1>
    <div class="welcome__btns">
        <a href="reset-password.php" class="btn btn-warning">Nollaa salasana</a>
        <a href="logout.php" class="btn btn-danger ml-3">Kirjaudu ulos</a>
    </div>
</section>

<section id="projects__list" class="projects__list">
    <div class="container">

      <div class="row">

        <div class="col-6"><h2 class="h1">Nykyiset projektit:</h2></div>

        <div class="col-6"><a class="ready_btn" href="./new-project.php">Uusi projekti</a></div>

      </div>

      <section id="projects">

        <table>

          <tr>

            <td>Projektit</td>

            <td>Nimi</td>
            <td>Mittamies</td>

            <td>Projektin pääsy:</td>

          </tr>
          <?php
          foreach ($posts as $post) {
            ?>
            <tr>
                <td><?= $post[2] ?></td>
                <td><?= $post[1] ?></td>
                <td style="text-transform: capitalize;"><?= $post[5] ?></td>
                <td><a href="post.php?id=<?= $post[0] . '&user=' . htmlspecialchars($_SESSION["username"]) ?>">Jatka projektiin</a></td>
              </tr>
            <?php
        }


        ?>
          

        </table>

      </section>

    </div>
</section>
    
</body>

</html>

