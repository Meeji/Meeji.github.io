use strict;
use warnings;
use File::Copy qw(copy);

my $TARGET_PATH     = ".\\..";
my $JADE_PATH       = ".\\jade";
my $LESS_PATH       = ".\\less";
my $TYPESCRIPT_PATH = ".\\typescript";
my $JAVASCRIPT_PATH = ".\\javascript";
my @TARGET_IGNORE   = ("src", "fonts", "js", "css", ".", "..", ".git", ".gitignore", "CNAME", "deploy.pl", "README.md");

my @target_dir      = Get_File_List(".");
my @jade_dir        = Get_File_List($JADE_PATH);
my @jade_templates  = Get_File_List($JADE_PATH."\\template");
my @javascript_dir  = Get_File_List($JAVASCRIPT_PATH);
my @js_target_dir   = Get_File_List($TARGET_PATH."\\js");

# Clear old files
for (@target_dir) {
  unlink $TARGET_PATH."\\".$_ unless $_ ~~ @TARGET_IGNORE;
}

# Jade!
for (@jade_templates) {
  unlink $JADE_PATH."\\template\\".$_ if $_ =~ /\.html$/;
}

for (@jade_dir) {
  unlink $JADE_PATH."\\".$_ if $_ =~ /\.html$/;
}

my $command = "jade -P ".$JADE_PATH."\\template";
print `$command`;

$command    = "jade -P ".$JADE_PATH;
print `$command`;

@jade_dir = Get_File_List($JADE_PATH);

for (@jade_dir) {
  copy $JADE_PATH."\\".$_, ".\\.." if $_ =~ /\.html$/;
}
# Done with Jade

# Less!
unlink $TARGET_PATH."\\css\\styles.css";
$command = "lessc ".$LESS_PATH."\\styles.less > ".$TARGET_PATH."\\css\\styles.css";
print `$command`;
# Done with Less

# Javascript!
unlink $TARGET_PATH."\\js\\".$_ for @js_target_dir;
copy $JAVASCRIPT_PATH."\\".$_, $TARGET_PATH."\\js" for @javascript_dir;
# Done with Javascript

# Typescript!
# Done with Typescript


sub Get_File_List {
  opendir (my $dh, shift) or die "oops ".$!;
  my @return = readdir $dh;
  closedir $dh;
  return @return
}