<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8">
  <title>WF työmaaeditori</title>
  <link rel="stylesheet" href="/css/modal.css">
  <link rel="stylesheet" href="/css/style.css">
  
  <link rel="apple-touch-icon" sizes="180x180" href="/css/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/css/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/css/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/css/favicon-16x16.png">
  <link rel="icon" type="image/x-icon" href="/css/favicon.ico">

  <?php 


    $usr = $_GET["user"];

    $usr_role = mysqli_query($db, "SELECT * FROM `users` WHERE `username`='$usr'; ");
    $usr_role = mysqli_fetch_all($usr_role);

    $usr_role = $usr_role[3];

    if($usr_role) {
      if($usr_role != 'mittaus') {
        echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
        
      }
      else {
        echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
      }
    }
    else {
      echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    }
  ?>
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/css/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">
  
  <!-- <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script> -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>

  <script src='/js/html2canvas.min.js'></script>
</head>
<body>
<section class="preloader">
 <!--Add class active to activate -->
  <div class="preloader_bg"></div>
  <div class="preloader__img">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;display: block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g transform="translate(50 50)">  <g transform="translate(-19 -19) scale(0.6)"> <g>
      <animateTransform attributeName="transform" type="rotate" values="0;36" keyTimes="0;1" dur="0.2s" begin="0s" repeatCount="indefinite"></animateTransform><path d="M31.35997276079435 21.46047782418268 L38.431040572659825 28.531545636048154 L28.531545636048154 38.431040572659825 L21.46047782418268 31.359972760794346 A38 38 0 0 1 12.756598534413827 35.79482076825907 L12.756598534413827 35.79482076825907 L14.320943184816137 45.67170417421045 L0.4933064164842036 47.86178668477369 L-1.071038233918106 37.98490327882231 A38 38 0 0 1 -10.719362751275682 36.45675880007113 L-10.719362751275682 36.45675880007113 L-15.25926774867115 45.36682404195481 L-27.733359087308305 39.01095704560115 L-23.193454089912837 30.10089180371747 A38 38 0 0 1 -30.100891803717467 23.19345408991284 L-30.100891803717467 23.19345408991284 L-39.010957045601145 27.73335908730831 L-45.3668240419548 15.259267748671157 L-36.45675880007112 10.719362751275689 A38 38 0 0 1 -37.98490327882231 1.0710382339181128 L-37.98490327882231 1.0710382339181128 L-47.86178668477369 -0.49330641648419493 L-45.67170417421045 -14.320943184816128 L-35.79482076825907 -12.75659853441382 A38 38 0 0 1 -31.35997276079435 -21.460477824182675 L-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -12.756598534413815 -35.79482076825908 L-12.756598534413815 -35.79482076825908 L-14.320943184816125 -45.671704174210454 L-0.493306416484226 -47.86178668477368 L1.0710382339180844 -37.98490327882231 A38 38 0 0 1 10.719362751275693 -36.45675880007112 L10.719362751275693 -36.45675880007112 L15.25926774867116 -45.3668240419548 L27.733359087308287 -39.01095704560117 L23.19345408991282 -30.100891803717484 A38 38 0 0 1 30.10089180371747 -23.193454089912834 L30.10089180371747 -23.193454089912834 L39.010957045601145 -27.733359087308305 L45.36682404195479 -15.259267748671181 L36.456758800071114 -10.71936275127571 A38 38 0 0 1 37.98490327882231 -1.0710382339181006 L37.98490327882231 -1.0710382339181006 L47.86178668477369 0.4933064164842056 L45.67170417421046 14.320943184816105 L35.79482076825908 12.756598534413799 A38 38 0 0 1 31.359972760794346 21.460477824182682 M0 -18A18 18 0 1 0 0 18 A18 18 0 1 0 0 -18" fill="#18ab00"></path></g></g> <g transform="translate(19 19) scale(0.6)"> <g>
      <animateTransform attributeName="transform" type="rotate" values="36;0" keyTimes="0;1" dur="0.2s" begin="-0.1s" repeatCount="indefinite"></animateTransform><path d="M-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -12.756598534413815 -35.79482076825908 L-12.756598534413815 -35.79482076825908 L-14.320943184816125 -45.671704174210454 L-0.493306416484226 -47.86178668477368 L1.0710382339180844 -37.98490327882231 A38 38 0 0 1 10.719362751275693 -36.45675880007112 L10.719362751275693 -36.45675880007112 L15.25926774867116 -45.3668240419548 L27.733359087308287 -39.01095704560117 L23.19345408991282 -30.100891803717484 A38 38 0 0 1 30.10089180371747 -23.193454089912834 L30.10089180371747 -23.193454089912834 L39.010957045601145 -27.733359087308305 L45.36682404195479 -15.259267748671181 L36.456758800071114 -10.71936275127571 A38 38 0 0 1 37.98490327882231 -1.0710382339181006 L37.98490327882231 -1.0710382339181006 L47.86178668477369 0.4933064164842056 L45.67170417421046 14.320943184816105 L35.79482076825908 12.756598534413799 A38 38 0 0 1 31.359972760794346 21.460477824182682 L31.359972760794346 21.460477824182682 L38.431040572659825 28.531545636048154 L28.531545636048183 38.4310405726598 L21.460477824182703 31.35997276079433 A38 38 0 0 1 12.756598534413818 35.79482076825907 L12.756598534413818 35.79482076825907 L14.32094318481613 45.67170417421045 L0.493306416484232 47.86178668477368 L-1.0710382339180797 37.98490327882231 A38 38 0 0 1 -10.719362751275689 36.45675880007112 L-10.719362751275689 36.45675880007112 L-15.259267748671162 45.3668240419548 L-27.733359087308344 39.01095704560112 L-23.19345408991287 30.100891803717445 A38 38 0 0 1 -30.10089180371747 23.193454089912837 L-30.10089180371747 23.193454089912837 L-39.01095704560115 27.7333590873083 L-45.366824041954814 15.259267748671112 L-36.456758800071135 10.719362751275648 A38 38 0 0 1 -37.98490327882231 1.0710382339181053 L-37.98490327882231 1.0710382339181053 L-47.86178668477368 -0.49330641648420825 L-45.67170417421043 -14.320943184816171 L-35.79482076825906 -12.756598534413857 A38 38 0 0 1 -31.359972760794346 -21.460477824182682 M0 -18A18 18 0 1 0 0 18 A18 18 0 1 0 0 -18" fill="#008d0e"></path></g></g></g>
    </svg>
  </div>
  <div class="preloader__heading">Odota hetki, Editori latautuu...</div>
</section>