---
layout: post
title: Fix LC_CTYPE warning message in Oracle Linux
tags:
  - troubleshooting
image: /images/posts/annoying-warning-lc_ctype.jpg
date: 2021-04-11T18:18:00.000Z
---
This article is for future me. 

Are you annoyed by this warning in Oracle Linux (or CentOS)?

`/etc/profile.d/lang.sh: line 19: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory`

Run this "one-liner" to fix this error message:

```
echo $'LANG=en_US.utf-8\nLC_ALL=en_US.utf-8' | sudo tee /etc/environment
```

That's it.

### Manual steps

If the one-liner does not work for you, try the steps below:

1. Run `vi /etc/environment`
2. Enter the following content:

```
LANG=en_US.utf-8
LC_ALL=en_US.utf-8
```

3. Save and exit
4. `sudo reboot`