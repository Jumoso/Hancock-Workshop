# Hancock Workshop

# Requirements

- Installed Docker version 17.12.0-ce, build c97c6d6
- Installed Docker-compose version 1.18.0, build 8dd22a9

Run environment
~~~
$ git clone git@github.com:Jumoso/hancock-workshop.git
$ cd hancock-workshop
$ make
~~~

In another terminal
~~~ 
$ cd utils/ethereum
$ docker build -t eth-signer . 
$ docker run -it eth-signer sk={private-key} data={base64-encoded-data-to-sign}
~~~
