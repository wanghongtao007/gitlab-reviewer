FROM docker.io/redhat/ubi8:latest as first_stage

#RUN \
# import rpm key
#    echo '--> import rpm keys' && \
#    rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial

USER root

RUN rm -fr /etc/yum.repos.d/*
ADD redhat.repo /etc/yum.repos.d/
ADD yarn.repo /etc/yum.repos.d/

COPY . /gitlab-reviewer/
#RUN curl -O -L https://nodejs.org/dist/v20.18.0/node-v20.18.0-linux-x64.tar.xz

RUN yum install -y  yarn
RUN yum install -y xz
RUN cd /gitlab-reviewer && tar -xvf node-v20.18.0-linux-x64.tar.xz && cd node-v20.18.0-linux-x64/bin && rm -fr /usr/bin/node && cp  node /usr/bin/node && rm -fr /usr/bin/npm && cp -f npm /usr/bin/npm && rm -fr /usr/bin/npx && cp -f npx /usr/bin/npx

RUN cd /gitlab-reviewer && pwd && ls && yarn
WORKDIR /gitlab-reviewer

RUN export NODE_OPTIONS=--openssl-legacy-provider
CMD ["/usr/bin/yarn","start"]
#CMD ["sleep 360000"]
