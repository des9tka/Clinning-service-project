FROM python:3.11-alpine

MAINTAINER Some Dev

ENV PYTHONUNBUFFERED=1

RUN apk add --no-cache --virtual ..build-deps gcc musl-dev mariadb-dev jpeg-dev zlib-dev libjpeg

RUN mkdir /app
WORKDIR /app

#RUN adduser -D user
#RUN chown -R user:user /app
#USER user
#
#ENV PATH="/home/user/.local/bin:${PATH}"


RUN pip install --upgrade pip && pip install pipenv

COPY Pipfile /tmp

RUN cd /tmp pipenv lock
RUN cd /tmp pipenv requirements > requirements.txt
RUN cd /tmp pip install -r requirements.txt
