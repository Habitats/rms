FROM --platform=linux/amd64 ubuntu:18.04

RUN apt update && apt install -y wget python3
RUN cd ~ && wget -O - "https://www.dropbox.com/download?plat=lnx.x86_64" | tar xzf -

RUN wget -O /usr/local/bin/dropbox "https://www.dropbox.com/download?dl=packages/dropbox.py" \
 && chmod +x /usr/local/bin/dropbox

CMD ~/.dropbox-dist/dropboxd
