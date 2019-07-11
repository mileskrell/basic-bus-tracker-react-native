#!/bin/bash
emulator_name="Nexus_5X_API_28_x86"
possible_pid=$(pidof emulator 2>/dev/null)
if [[ -z "$possible_pid" ]]; then
    printf "Launching emulator\n"
    emulator -avd "$emulator_name" &
else
    printf "Emulator already running\n"
fi
