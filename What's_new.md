# Why this project?
The original curve-2pool-v1 is used to exchange stable coins with value $1.

However, there are stable coins not valued $1 like RAI. To gain more compatibility, it needs to adjust to fit them.

Stable-swap is another repo developed by curve team, it is used to swap between 3pool and RAI, based on curve-2pool-v1, and provide more features such as admin options. 
Just a few modification should be done to achieve the goal.

# What modification I did?
Remove unused function: e.g. exchange_underlying and everything related to underlying tokens
Remove unused statements and variables: e.g. the init function contains "base_pool", which is not needed in our new pool
Slightly change calculations: all thing needs "vp" is modified to 10^18 since our other coin is a $1 stable coin.
