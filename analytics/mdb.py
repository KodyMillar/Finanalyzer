from pymongo import MongoClient
from datetime import datetime
import mysql.connector


def get_mysql_connection():
    try:
        conn = mysql.connector.connect(
            host='mysql',
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


def connect_to_mongodb():
    client = MongoClient('mongodb://mongodb:27017/')
    db = client['analytics']
    return db

def store_analytics_in_mongodb(db, user_id, initial_investment, annual_contribution, duration, risk, interest, interest_percentage, total_return):
    analytics_collection = db['analytics_data']
    analytics_record = {
        'userId': user_id,
        'initialInvestment': initial_investment,
        'annualContribution': annual_contribution,
        'duration': duration,
        'risk': risk,
        'interest': interest,
        'interestPercentage': interest_percentage,
        'totalReturn': total_return,
        'calculation_date': datetime.now() 
    }
    analytics_collection.insert_one(analytics_record)
    print(f"Analytics data stored for user {user_id}")

if __name__ == '__main__':

    mysql_conn = get_mysql_connection()
    mongodb = connect_to_mongodb()

    user_id = "user123"
    initial_investment = 10000  # Example data
    annual_contribution = 500  # Example data
    duration = 5  # Example data (in years)
    risk = "Balanced"  # Example data
    interest = 0.04  # Example data (interest rate)
    interest_percentage = "4%"  # Example data (as a string)
    total_return = 12500  # Example data (calculated total return)

    store_analytics_in_mongodb(mongodb, user_id, initial_investment, annual_contribution, duration, risk, interest, interest_percentage, total_return)

    if mysql_conn:
        mysql_conn.close()
