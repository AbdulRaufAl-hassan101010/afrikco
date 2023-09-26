from email.message import EmailMessage
import smtplib
from os import environ

MAIL_PASSWORD = environ.get('MAIL_PASSWORD')



def send_email(email_sender="abdulraufalhassan101010@gmail.com", email_receiver="", subject="", body=""):
    em = EmailMessage()
    em["From"] = email_sender
    em["To"] = email_receiver
    em["subject"] = subject
    em.set_content(body)


    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(email_sender, MAIL_PASSWORD)
            smtp.send_message(em)
            print("Email sent successfully!")
    except Exception as e:
        print(f"An error occurred: {str(e)}")


