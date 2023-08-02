# Editori WF

Документация
Данный проект позволяет создавать проекты по постройке домов.

На 24-07-2023 существует три роли: 
1. Mittaus (измерение)
2. Комментатор
3. Админ


Вся основная работа в первой роли. 
Комментарии к табле comments прикладывает роль комментатора
Администратор может менять общие настройки едитора

УСТАНОВКА:
1. Скачайте данный репозиторий
2. Установите базу данных из папки DB к себе на локальный сервер в phpmyadmin. Рекомендуется к использованию программа Open Server
3. Подключите проект к базе данных в файлах vendor/config.php и config.php
4. Editor готов к пользованию

Тестовые доступы:
1. Измерение
    Jyri
    Ipah6Xae!
2. Комментирование
    duunari 
    Nakkimakkara456
3. Админитсрация
    Marko
    NakkiMakkara123


Вход через *Название сайта на локалке*/login.php


КАК ПУШИТЬ?
1. Загружайте актуальную базу данных в папку db
2. Пишите в readme.txt или нам напрямую, что сделано (что из сделанного проверять)
3. Закидывайте все файлы пушом в репозиторий


Костяк проекта - происходящее в php файлах, поэтому любезно предоставляем описание к функционалу каждого:

Подключение к базе данных:
config.php и vendor/config.php


  
Функционал: 

addcomment.php - Добавляет в базу данных комментарий (роль 2) 

ajaxupload.php - Загружает файлы в папку при загрузке нового проекта в new-project.php (роль 1) 

comment__kuittaus.php - Помечает комментарий сделанным (роль 2)

commentattachmentupload.php - Добавляет к комменатрию вложение (роль 2)
commentreport.php - При заходе, бросает на почту администрации рапорт о выполненных комментариях (роль 3)
get-added-users.php - ???? (роль 2)
getanswers.php - ???? (роль 2)
updateproject.php - Пушит в базу данных обновленные данные проекта (роль 1)
upload.php - Старый загрузчик файлов (роль 1)
db/updatepohjat.php - Сохраняет и обновляет новые шаблоны помещений в базу данных (роль 1)


Части
header.php - 
index.php
footer.php
footer-post.php
+php файлы в папке 'templates'

login.php
logout.php


levynakyma.php
new-project.php
post.php в templates составляющие
register.php
reset-password.php
welcome.php
welcome-marko.php
templates/commentator.php - ?
