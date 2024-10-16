FROM docker.io/redhat/ubi8:latest as first_stage

#RUN \
# import rpm key
#    echo '--> import rpm keys' && \
#    rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial

USER root

RUN rm -fr /etc/yum.repos.d/*
ADD redhat.repo /etc/yum.repos.d/
ADD yarn.repo /etc/yum.repos.d/

COPY ./* /gitlab-reviewer/
RUN cd /gitlab-reviewer
RUN yum install -y  yarn
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN yarn
CMD ["/usr/bin/yarn"," start"]
