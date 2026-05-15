export const cheatSheetData = [
  { topic: "Routing vs Forwarding", content: "Routing: End-to-End (Global), Find best path. Forwarding: Router-Local, Transfer to output." },
  { topic: "RIP vs OSPF", content: "RIP: Distance-Vector, Hop Count (max 15), Slow convergence. OSPF: Link-State, Cost (Bandwidth), Fast convergence." },
  { topic: "Access vs Trunk Ports", content: "Access: Single VLAN, Untagged. Trunk: Multiple VLANs, Tagged (802.1Q)." },
  { topic: "Delay Formulas", content: "Transmission Delay: L / R. Propagation Delay: d / s. Total Nodal Delay: proc + queue + trans + prop." }
];

export const commandData = [
  { cmd: "show ip route", desc: "View the IP routing table", category: "Verification" },
  { cmd: "show ip ospf neighbor", desc: "View OSPF neighbor relationships", category: "Verification" },
  { cmd: "show ip ospf database", desc: "View the Link-State Database (LSDB)", category: "Verification" },
  { cmd: "show vlan brief", desc: "View VLAN assignments on switch", category: "Verification" },
  { cmd: "router rip", desc: "Enter RIP configuration mode", category: "RIP" },
  { cmd: "version 2", desc: "Enable RIP version 2", category: "RIP" },
  { cmd: "network", desc: "Enable routing on a network", category: "RIP/OSPF" },
  { cmd: "no auto-summary", desc: "Disable classful summarization", category: "RIP" },
  { cmd: "router ospf", desc: "Enter OSPF configuration mode", category: "OSPF" },
  { cmd: "router-id", desc: "Set OSPF router ID", category: "OSPF" },
  { cmd: "vlan", desc: "Create a VLAN", category: "VLAN" },
  { cmd: "switchport mode access", desc: "Set port to access mode", category: "VLAN" },
  { cmd: "switchport mode trunk", desc: "Set port to trunk mode", category: "VLAN" }
];

export const visualizerData = [
  { title: "Packet Path", desc: "Router forwarding decision and path visualization" },
  { title: "VLAN Tagging", desc: "802.1Q tag field in Ethernet frame" },
  { title: "MAC Learning", desc: "How switches learn MAC addresses and flood unknown frames" },
  { title: "RIP Hop Count", desc: "How hop count increases at each router" },
  { title: "OSPF Process", desc: "LSDB to SPF to Routing Table transition" }
];
