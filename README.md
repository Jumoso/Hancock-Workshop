# Hancock Workshop

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
