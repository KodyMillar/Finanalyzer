import mysql.connector

def get_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='user',
            password='password',
            database='analytics'
        )
        if conn.is_connected():
            print('Connected to MySQL database')
            return conn
    except Exception as e:
        print(f'Error: {e}')
        return None

def get_user_average(conn, user_id):
    cursor = conn.cursor()
    query = 'SELECT AVG(interest_rate) FROM interests WHERE user_id = %s'
    cursor.execute(query, (user_id,))
    result = cursor.fetchone()
    cursor.close()
    return result[0] if result else None

def calculate_future_interest(connection, user_id, years):
    cursor = connection.cursor()
    query = "SELECT interest_rate FROM interests WHERE user_id = %s ORDER BY date_entered DESC LIMIT 1"
    cursor.execute(query, (user_id,))
    result = cursor.fetchone()
    cursor.close()
    if result is not None:
        current_interest_rate = result[0]
        return current_interest_rate * years
    else:
        return None
    
def group_users_by_years(connection, years):
    cursor = connection.cursor()
    query = """
        SELECT user_id, AVG(interest_rate) 
        FROM interests 
        WHERE interest_years = %s 
        GROUP BY user_id
    """
    cursor.execute(query, (years,))
    result = cursor.fetchall()
    cursor.close()
    return result

def compare_with_others(connection, user_id, years):
    user_avg = get_user_average(connection, user_id)
    grouped_users = group_users_by_years(connection, years)

    if user_avg is not None and grouped_users:
        group_avg = sum([x[1] for x in grouped_users]) / len(grouped_users)
        comparison_results = {
            "user_avg": user_avg,
            "group_avg": group_avg
        }
        return comparison_results
    else:
        return None

if __name__ == '__main__':
    conn = get_connection()
    if conn is not None:
        try:
            print(f"User's average interest: {get_user_average(conn, 1)}")
            print(f"Future interest: {calculate_future_interest(conn, 1, 5)}")
            print(f"Grouped users by years: {group_users_by_years(conn, 5)}")
            comparison = compare_with_others(conn, 1, 5)
            if comparison:
                print(f"User average: {comparison['user_avg']}, Group average: {comparison['group_avg']}")
            else:
                print("No comparison data available.")
        finally:
            conn.close()
            print('Connection closed')
    else:
        print('Connection failed')
