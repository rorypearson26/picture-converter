FROM python:3.8.0

WORKDIR /app

COPY "./requirements.txt" .

# Install dependancies
RUN pip install -r requirements.txt

ADD . /app

CMD ["uwsgi", "app.ini"]
