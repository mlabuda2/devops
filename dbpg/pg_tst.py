import signal
import sys
import time
import psycopg2
import psycopg2.extras


def create_conn_get_cur():
    conn = psycopg2.connect(f"host=localhost dbname=mati user=mati password=sztyczaczek")
    conn.set_session(autocommit=True)
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    return cur


cur = create_conn_get_cur()
cur.execute('select * from test')
res = cur.fetchall()
print(res[0]['msg'])
