import pymysql




def get_connection():

    connection = pymysql.connect(

        host='localhost',

        user='root',

        password='meeta1308',

        database='taskflow',

        cursorclass=pymysql.cursors.DictCursor

    )


    return connection