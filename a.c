#!/usr/bin/env -S sh -c '[ "$0".bin -nt "$0" ] || tail -n+2 "$0" | cc -x c - -o "$0".bin || exit 1; exec "$0".bin "$@"'
#include <stdio.h>

int main(void)
{
    printf("Hello, world!\n");
    return 0;
}
