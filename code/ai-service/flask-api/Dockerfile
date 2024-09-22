FROM python:3.9-slim

WORKDIR /app

COPY main.py requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 9080

ENV FLASK_APP=main.py

CMD ["flask", "run", "--host=0.0.0.0", "--port=9080"]