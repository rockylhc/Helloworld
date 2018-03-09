FROM nginx

RUN cd /usr/share/nginx/html/
RUN rm -rf /usr/share/nginx/html/
RUN mkdir /usr/share/nginx/html

COPY index.html /usr/share/nginx/html/

# Build app
ENV HOST 0.0.0.0
EXPOSE 1234

