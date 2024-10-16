import mysql.connector
import yaml
import connexion
import logging
import logging.config
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta, timezone
from statistics import mean
from connexion import NoContent
import time

with open('app_conf.yml', 'r') as f:
    app_config = yaml.safe_load(f.read())

def get_connection():
    try:
        conn = mysql.connector.connect(
            host=app_config['datastore']['host'],
            port=app_config['datastore']['port'],
            # user=db_config['datastore']['user'],
            user="root",
            password=app_config['datastore']['password'],
            database=app_config['datastore']['db']
        )
        if conn.is_connected():
            print('Connected to MySQL database')
            return conn
    except Exception as e:
        print(f'Error: {e}')
        return None

def get_user_investment():
    conn = get_connection()
    
    current_time = int(time.time() * 1000)
    previous_time = current_time - 5000

    query = 'SELECT userid, investment_amount, annual_contribution, duration, risk, years \
            FROM investments \
            WHERE date_created < %s AND date_created > %s'

    # Get the current time in milliseconds
    
    cursor = conn.cursor()
    cursor.execute(query, (current_time, previous_time))
    result = cursor.fetchall()
    cursor.close()

    for row in cursor.fetchall():
        calculate_future_interest_with_contributions(row['userId'], row['investment_amount'], row['annual_contribution'], row['duration'])


def init_scheduler():
	sched = BackgroundScheduler(daemon=True)
	sched.add_job(get_user_investment,
				  'interval',
				  seconds=app_config['scheduler']['period_sec'])
	sched.start()

    

def get_user_average(conn, user_id):
    cursor = conn.cursor()
    query = 'SELECT AVG(interest_rate) FROM interests WHERE user_id = %s'
    cursor.execute(query, (user_id,))
    result = cursor.fetchone()
    cursor.close()
    return result[0] if result else None

def calculate_future_value(principal, annual_contribution, interest_rate, years):
    # Formula: A = P(1 + r/n)^(nt) + PMT * [(1 + r/n)^(nt) - 1] / (r/n)
    # P is the initial principal, PMT is the annual contribution, r is the interest rate, n is the number of compounding periods per year, and t is the number of years.
    n = 1  # Assuming annual compounding
    future_value = principal * (1 + interest_rate / n) ** (n * years)
    
    for year in range(1, years + 1):
        future_value += annual_contribution * (1 + interest_rate / n) ** (n * (years - year))
    
    return future_value

def calculate_future_interest_with_contributions(connection, user_id, initial_investment, annual_contribution, years):
    cursor = connection.cursor()
    query = "SELECT interest_rate FROM interests WHERE user_id = %s ORDER BY date_entered DESC LIMIT 1"
    cursor.execute(query, (user_id,))
    result = cursor.fetchone()
    cursor.close()
    if result is not None:
        current_interest_rate = result[0]
        return calculate_future_value(initial_investment, annual_contribution, current_interest_rate, years)
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
    init_scheduler()
    if conn is not None:
        try:
            # Prompt the user for input
            # initial_investment = float(input("Enter the initial investment amount: "))
            # annual_contribution = float(input("Enter the annual contribution: "))
            # years = int(input("Enter the number of years for the investment: "))
            
            # Example user_id
            query = 'SELECT userid, investment_amount, annual_contribution, duration, risk, years \
                    FROM '
            conn.cursor()
            
            future_value = calculate_future_interest_with_contributions(conn, user_id, initial_investment, annual_contribution, years)
            if future_value is not None:
                print(f"Future value after {years} years: {future_value}")
            else:
                print("No interest rate data available for this user.")
            
            comparison = compare_with_others(conn, user_id, years)
            if comparison:
                print(f"User average interest rate: {comparison['user_avg']}, Group average interest rate: {comparison['group_avg']}")
            else:
                print("No comparison data available.")
        finally:
            conn.close()
            print('Connection closed')
    else:
        print('Connection failed')
