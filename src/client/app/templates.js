'use strict'; module.exports = angular.module("personalHome").run(["$templateCache", function($templateCache) {$templateCache.put("prod/app/components/static/404.html","<h2>Page not found</h2>\n\n<p error404></p>\n\n<p>Feel free to contact me if you think there\'s a problem with the website.</p>\n");
$templateCache.put("prod/app/components/static/about.html","<h2>About</h2>\n\n<p>\n    I\'ll start with a little background. I graduated from University of Wisconsin-Eau Claire with a bachelor\'s in CS in 2010 and went on to work for a Home Improvement retail company Menards. In 2011, I moved to Colorado and worked at a company Amadeus Consulting for two and a half years, before I decided to work remotely part-time for them while living back home in Wisconsin. It was nice being back home and spending time with family, but it also gave me time to work on personal projects. The projects listed on this site are a couple that I feel proud of for one reason or another.\n</p>\n\n<h3>Moving Forward</h3>\n<p>\n    I recently moved to Richmond, CA and am now looking for a front-end/open source\'y full-time position around the Bay Area. I have spent a lot of concentrated time learning what I could about front-end technologies, their best practices, and how they fit in the grand scheme of client/server-side development. I am happy to talk specific implementation details assuming they are scoped within the <a href=\"/my-stack\">stack I\'ve chosen to learn</a>. My ideal job would be creating user interfaces as I really enjoy working with a designer to produce great-looking UIs that are clean, intuitive, and fun to use. Having worked with a consulting company for three years however, I feel comfortable being thrown where needed most.\n</p>\n\n<h3>Side note</h3>\n<p>\n    In an attempt to sound less boring: If anyone reading this lives in the Bay Area, enjoys foosball, and doesn\'t already know about Thursday night foosball tournaments at\n    <a href=\"https://www.google.com/maps?ll=37.804153,-122.415273&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=10795995370781290243\">Kennedy\'s Irish Pub and Indian Restaurant</a>, then you should drop by and bring your A-game. Nineteen times out of twenty I will be there.\n</p>\n");
$templateCache.put("prod/app/components/static/contact.html","<h2>Contact</h2>\n\n<p>\n    I\'ve been good at staying off the social media, so this page is bare.\n</p>\n<dl class=\"contact-info\">\n    <dt>Email</dt>\n    <dd>philip.olson@protonmail.ch</dd>\n    <dt>Google Voice</dt>\n    <dd>720.583.4641</dd>\n</dl>\n");
$templateCache.put("prod/app/components/static/home.html","<h2>Home</h2>\n\n<p>For those who don\'t know, my name is Phil Olson. Right now this is just a place where I\'ll post personal projects and other career-related info intended as a resume supplement.</p>\n<p>Shameless selfie:</p>\n<img id=\"me\" src=\"img/me.png\" alt \"profile of me\"/>\n<p>Projects and other info can be found via the links on the right. All projects will have links to source-code, and a link to the web-page if applicable.</p>\n<p>The source for this site <a href=\"https://github.com/olsonpm/personal-home\">can be found here</a>\n</p>\n");
$templateCache.put("prod/app/components/static/linux-thangs.html","<h2>Linux Thangs</h2>\n\n<p>Starting mid-August of last year, I finally decided to learn what I could about Linux (had always worked with Windows prior). I built a computer and installed a couple OS\'s before landing on ubuntu server 14.04. I wanted to become comfortable on the command line to see what it had to offer. I found the experience invaluable when moving onto my current Ubuntu desktop.</p>\n\n<h3>Making Bash useful</h3>\n<p><a href=\"https://github.com/olsonpm/bash-library\">Here is my small Bash library</a>. I decided to learn Bash before understanding the breadth of its utility, and my first goal was to create a usable \'import\'. There were some hoops to jump through, but I ultimately got it working and was happy with the relatively clean result. Other utilities I created and made import\'able were logging, a simple test library (including a results displayer), a library to manage configuration files, and a simple Bash file_exists abstraction.</p>\n\n<h3>VSFTPd</h3>\n<p><a href=\"https://github.com/olsonpm/vsftpd-scripts\">Here are my vsftpd scripts</a>. When I first installed Ubuntu server I had a few projects in mind, but foremost I wanted an ftps server (I guess sftp is superior, but I already started working toward ftps before realizing this). With the above Bash library and a newfound organized pattern of bash development, I created the scripts which basically formulate an ftp server application. My requirements were:</p>\n<ul>\n    <li>Security comes first (hence vsftpd and <a href=\"https://github.com/snookie/pam-pgsql-bcrypt/commits?author=olsonpm\">my small contributions to pam-pgsql*</a>)</li>\n    <li>Easily support a varying number of users (Scripting user CRUD was a must)</li>\n    <li>Users can belong to groups, where a group has a shared r/w directory as well as a read-only directory</li>\n</ul>\n<p>Although I became comfortable working with bash after this project, I would definitely say it taught me why people choose python/perl/etc when scripting small applications such as this one. Still, the outcome was a useable, secure ftps server manager which I was very happy about.</p>\n<p>*Ubuntu\'s pam-pgsql package didn\'t support b-crypt and its other options were pretty terrible in comparison, which is why I found an external repository with a b-crypt port.</p>\n");
$templateCache.put("prod/app/components/static/misc-music-tool.html","<h2>Misc. Music Tool</h2>\n\n<ul class=\"site-source-listing\">\n    <li>\n        <a href=\"http://music.philipolsonm.com\">Here is the website</a>\n    </li>\n    <li>\n        <a href=\"https://github.com/olsonpm/misc-music-django\">Here is the source</a>\n    </li>\n</ul>\n<p>So over Christmas I wanted to work a little with one of my brothers who plays upright bass for UWEC jazz (I played cello -- our family is a mini orchestra). He provided some much-needed domain knowledge for the above tool. At first my goal was to write something for fun and take a brief stab at Python. The result of <a href=\"https://github.com/olsonpm/misc-music-scripts\">that project can be found here</a>. I then asked myself how hard it would be to turn those scripts into a web application. Two and a half weeks later I had a working website that I\'m proud of sharing.</p>\n\n<p>In all honesty, the tool itself isn\'t very useful - as are most programs built in 3 weeks. The reason I\'m happy with it is because I tackled a few issues in a relatively short period of time</p>\n\n<ul>\n    <li>Learned enough Python/Django to end up with an organized web app.</li>\n    <li>Learned the relatively recent browser Web Audio API.</li>\n    <li>Tried out bootstrap for the first time.</li>\n</ul>\n\n<p>Python is a straight forward language and bootstrap is just a css library so those weren\'t difficult to pick up. The Web Audio API on the other hand is very low-level and surprised me with how long it took to get sounds that weren\'t clicking, too loud, or overlapping. And of course the domain logic wasn\'t trivial. Overall I\'m extremely pleased with the three-week project.</p>\n");
$templateCache.put("prod/app/components/static/my-node-tools.html","<h2>My Node Tools</h2>\n\n<p>I\'m hoping to finish some of these node-tools and publish them on npm soon.</p>\n\n<h3>Project Scaffolder</h3>\n<p><a href=\"https://github.com/olsonpm/project-scaffolder\">Here is the beginning of my project scaffolder</a>, though I\'m more posting this to discuss my general thoughts on scaffolders. When I first read about them, the concept seemed awesome because I spent too much time configuring the beginning of a website. This mostly includes the build process, but can also include testing setup, watchers + live-reload, and client/server side directory structure along with common code. The most popular scaffolder right now seems to be Yeoman. Since I wanted to use angular for a pet project, I found a Yeoman \'angular generator\' and realized it\'s not just angular but all these other tools I don\'t need. I then saw 100 other angular generators. Pretty inefficient if you ask me, because obviously people need something more generic than the ability to create their own narrow generator and impulsively share it with the world. They\'re also completely abusing the search term \'angular generator\'.</p>\n\n<p>I want a project scaffolder to be configurable with a base template folder from which files get added to and modified in depending on user input. I want that template folder and configuration file to be easily modified and then shared with a team so that every project shares a similar structure. What yeoman generators essentially are (and how they should be termed) are generator configurations. However instead of all those configurations residing in a single json file, they are hardwired with custom code. This means customizing anything likely means modifying that code, which is why so many one-off generators are created.</p>\n\n<p>It\'s very possible my knowledge on this subject is far too small to be taken seriously, but my goal is to create a single, configurable scaffolder.</p>\n\n<h3>Task Runner</h3>\n<ul class=\"site-source-listing\">\n    <li class=\"site-name\">\n        Source Code\n    </li>\n    <li>\n        <a href=\"https://github.com/olsonpm/true-task\">Task</a>\n    </li>\n    <li>\n        <a href=\"https://github.com/olsonpm/true-task-manager\">Task Manager</a>\n    </li>\n    <li>\n        <a href=\"https://github.com/olsonpm/true-task-manager-cli\">Task Manager CLI</a>\n    </li>\n</ul>\n\n<p>My task runner is almost complete. I had to stop working on it in order to get this website out.</p>\n\n<p>The main reason I decided to create my own task runner is I wanted to pass arguments into a build process. I\'ve gotten around this using environment variables, but my simple use-case was to have a build task perform different logic based on whether it was intended for dev/test/prod. The current Gulp structure doesn\'t allow for that directly. Working on my own task runner also opened my eyes to how much of a wrapper gulp actually is. That team did a great job of creating a coherent structure from existing tools, but some of their tooling choices I don\'t agree with. Particularly their avoidance of promise-based tasks and their dependency on vinyl streams are why I chose to create my own.\n</p>\n");
$templateCache.put("prod/app/components/static/my-stack.html","<h2>My Stack</h2>\n\n<p>When I first moved out to CA without front-end experience, I looked at available jobs and realized companies tend not to ask for experience in a single stack, but more for experience in any of the common technologies available for a given stack. The major players in the stack I decided on are the following:</p>\n<dl>\n    <dt>PaaS</dt>\n    <dd>Heroku</dd>\n    <dt>Package manager</dt>\n    <dd>Npm</dd>\n    <dt>Server-side</dt>\n    <dd>Nodejs</dd>\n    <dt>Web Framework</dt>\n    <dd>Express</dd>\n    <dt>DB Server</dt>\n    <dd>PostgreSQL</dd>\n    <dt>Front-end Framework</dt>\n    <dd>Angular</dd>\n    <dt>Testing Framework</dt>\n    <dd>Mocha+Chai</dd>\n    <dt>Promise Library</dt>\n    <dd>Bluebird</dd>\n    <dt>Logging Framework</dt>\n    <dd>Bunyan</dd>\n    <dt>Build Tool</dt>\n    <dd>Gulp (+Browserify)</dd>\n    <dt>Collections Library</dt>\n    <dd>Lazy.js</dd>\n    <dt>Animation Library</dt>\n    <dd>GSAP</dd>\n</dl>\n<p>The only portion of that stack that might not make it into a personal project of mine is PostgreSQL because it may not call for a database. I\'ve learned to depend on the above tools and have created wrappers for a couple in order to streamline my common-usage of them.</p>\n<p>That being said, I know there are good alternatives and I list the above more as reference to what you can expect from me as opposed to what I expect to be working with at my next job. I am willing to learn any technology that isn\'t well on its way to becoming obsolete.</p>\n");
$templateCache.put("prod/app/components/static/twitter-api-tester.html","<h2>Twitter API Tester</h2>\n\n<ul class=\"site-source-listing\">\n    <li class=\"site-name\">\n        Birthday Twitter Stream\n    </li>\n    <li>\n        <a href=\"http://tweet.mitchsbirfday.com\">Website</a>\n    </li>\n    <li>\n        <a href=\"https://github.com/olsonpm/mitchsbirfday\">Source</a>\n    </li>\n    <li class=\"site-name\">\n        Demonstrable Twitter Ticker\n    </li>\n    <li>\n        <a href=\"http://tweet.philipolsonm.com\">Website</a>\n    </li>\n    <li>\n        <a href=\"https://github.com/olsonpm/tweet-ticker\">Source</a>\n    </li>\n</ul>\n\n<p>So after spending so much time learning about web technologies and working on an unfinished longer-term project of mine, I wanted to build something quickly. That sparked mostly when I was reminded of my friend\'s birthday. The project I was working on at the time was pushed aside for a day as I quickly output the <a href=\"http://tweet.mitchsbirfday.com/\">twitter feed for all #mitchsbirfday tweets</a>. There were two problems:\n</p>\n\n<ol>\n    <li>I finally finished the website and made it public around midnight</li>\n    <li>The website is undemonstrable without active #mitchsbirfday tweets.</li>\n</ol>\n\n<p>Mostly due to #2, I decided the following day to create <a href=\"http://tweet.philipolsonm.com\">this mitchsbirfday offshoot</a> which was far more demonstrable.\n</p>\n\n<p>I was happy with the result of these projects because I was able to learn the twitter api, learn some basic socket.IO programming, and output two (albeit similar) websites in two days. Their UI\'s are clean and personally I find the ticker amusing to watch when setting the keyword to \'kardashian\'.</p>\n");}]);