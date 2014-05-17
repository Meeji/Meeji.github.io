use strict;
use warnings;
use File::Copy qw(copy);

my $PATH        = ".\\oddeyedcat";
my $DEPLOY_FROM = "build";
my $DEPLOY_TO   = "..";
my @TARGET_IGNORE = (".", "..", ".git", "oddeyedcat", "OLD", ".gitignore", "CNAME", "deploy.pl", "README.md");
my @SOURCE_IGNORE = ();

my @deploy_source = Get_File_List($DEPLOY_FROM);
my @deploy_target = Get_File_List($DEPLOY_TO);

for (@deploy_target) {
  unlink $PATH . "\\" . $DEPLOY_TO . "\\" . $_ unless $_ ~~ @TARGET_IGNORE;
}

for (@deploy_source) {
  copy $PATH . "\\" . $DEPLOY_FROM . "\\" . $_ , $PATH . "\\" . $DEPLOY_TO . "\\" . $_;
}

sub Get_File_List {
  opendir (my $dh, $PATH . "\\" . shift) or die "oops";
  my @return = readdir $dh;
  closedir $dh;
  return @return
}