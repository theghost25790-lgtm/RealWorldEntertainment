(() => {
  const networkLabel = document.querySelector("[data-network-label]");
  const networkDot = document.querySelector("[data-network-dot]");
  const clock = document.querySelector("[data-clock]");

  function updateNetwork() {
    const online = navigator.onLine;
    if (networkLabel) networkLabel.textContent = online ? "Online" : "Offline";
    if (networkDot) {
      networkDot.classList.toggle("online", online);
      networkDot.classList.toggle("offline", !online);
    }
  }

  function updateClock() {
    if (!clock) return;
    clock.textContent = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date());
  }

  updateNetwork();
  updateClock();
  window.addEventListener("online", updateNetwork);
  window.addEventListener("offline", updateNetwork);
  window.setInterval(updateClock, 30000);

  const terminal = document.querySelector("[data-terminal]");
  const terminalInput = document.querySelector("[data-terminal-input]");

  if (terminal && terminalInput) {
    const boot = [
      "CONSTRUCT CIVIC SYSTEMS // ACCESS NODE",
      "Node: QR-DEMO-01",
      "Status: LIMITED PUBLIC INTERFACE",
      "",
      "Type HELP for available commands."
    ];
    terminal.textContent = boot.join("\n");

    const commands = {
      HELP: "AVAILABLE: STATUS / ID / PROVIDES / CLEAR",
      STATUS: "CIVIC LINK: ONLINE\nCELL SERVICE: NOMINAL\nCLEARANCE: PUBLIC",
      ID: "IDENTITY NOT PRESENT.\nPUBLIC NODE — NO BIOMETRIC CLAIM MADE.",
      PROVIDES: "CONSTRUCT PROVIDES.",
      CLEAR: ""
    };

    terminalInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      const command = terminalInput.value.trim().toUpperCase();
      terminalInput.value = "";

      if (command === "CLEAR") {
        terminal.textContent = "";
        return;
      }

      const response = commands[command] ?? "UNRECOGNISED COMMAND. TYPE HELP.";
      terminal.textContent += `\n\n> ${command || "(EMPTY)"}\n${response}`;
      terminal.scrollTop = terminal.scrollHeight;
    });
  }
})();
