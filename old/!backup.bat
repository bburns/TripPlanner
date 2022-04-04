:: backup files to cloud
:: gitlab stores most, but misses some things like .env, .bat, .lnk files
:: robocopy synchronize syntax: robocopy <src> <dst> /MIR [/XD <dir to exclude>]

set dest=C:\cloud\@Projects\tripplanner annex\@backup-react

robocopy . "%dest%" /MIR /XD .git /XD node_modules /XD build
