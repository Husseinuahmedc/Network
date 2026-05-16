const NETWORK_EXAM_BANK = [
  {
    id: 'routing-forwarding',
    title: 'Routing / Forwarding / Performance',
    source: 'Lecture 2 PDF: packet switching, routing, forwarding, services, delay and performance.',
    focus: ['Routing vs Forwarding', 'Connectionless vs Connection-Oriented', 'Forwarding Table', 'L/R Delay'],
    mcq: [
      ['Internet network layer today is mainly a ____ network.', 'Packet-switched network'],
      ['Packet switching divides a message into ____.', 'Packets'],
      ['Network layer duties are ____ and ____.', 'Routing and forwarding'],
      ['Routing means finding the ____ route.', 'Best'],
      ['Forwarding chooses the output ____.', 'Interface'],
      ['Connectionless service treats packets ____.', 'Independently'],
      ['Datagram packets may take ____ paths.', 'Different / not necessarily same'],
      ['Connection-oriented service requires a ____ before data transfer.', 'Virtual connection / virtual circuit'],
      ['A virtual circuit packet uses a flow label or ____ identifier.', 'VC'],
      ['Transmission delay formula is ____.', 'L / R'],
      ['L means packet length in ____.', 'Bits'],
      ['R means link rate in ____.', 'Bits/sec'],
      ['No matching route means the packet is ____.', 'Dropped'],
      ['Store-and-forward receives the ____ packet before forwarding.', 'Whole'],
      ['Cut-through starts forwarding before receiving the ____ packet.', 'Whole']
    ],
    sa: [
      ['Define packet switching.', 'A method where an upper-layer message is divided into packets that are sent through the network and reassembled at the destination.'],
      ['Define routing.', 'The network-layer process of finding the best path from source to destination.'],
      ['Define forwarding.', 'The per-router action of sending an arriving packet out the correct output interface using a forwarding/routing table.'],
      ['Define connectionless service.', 'A service where packets are treated independently and no setup is required.'],
      ['Define connection-oriented service.', 'A service where a virtual connection is established before sending data and packets follow the same path.'],
      ['What is transmission delay?', 'The time needed to push an L-bit packet into a link of rate R; formula L/R.'],
      ['What information does forwarding use?', 'Destination address or label from the packet header and the forwarding table.']
    ],
    compare: [
      ['Routing', 'Forwarding', [['Finds best path', 'Sends packet to output interface'], ['Uses protocols', 'Uses routing/forwarding table'], ['Network-wide logic', 'Local router action'], ['Builds knowledge', 'Applies knowledge per packet']]],
      ['Connectionless', 'Connection-Oriented', [['No setup', 'Setup required'], ['Packets independent', 'Packets related'], ['Paths may differ', 'Same path usually'], ['Simple and scalable', 'Predictable order / better QoS']]],
      ['Store-and-Forward', 'Cut-Through', [['Full packet first', 'Starts early'], ['More delay', 'Less delay'], ['More checking', 'Faster forwarding']]]
    ]
  },
  {
    id: 'routing-algorithms',
    title: 'Routing Algorithms',
    source: 'Lecture 3 PDF: routing algorithm goals, packet forwarding, static/dynamic routing, dynamic protocol components.',
    focus: ['Optimality', 'Scalability', 'Robustness', 'Static vs Dynamic', 'Distance-vector vs Link-state'],
    mcq: [
      ['Routing algorithms determine the ____ path.', 'Best'],
      ['Key goals are optimality, scalability, and ____.', 'Robustness'],
      ['Routers collect data about network ____.', 'Topology'],
      ['OSPF uses ____ to advertise link-state information.', 'LSAs'],
      ['OSPF path calculation uses ____ algorithm.', 'Dijkstra'],
      ['Dynamic routing data structures are kept in ____.', 'RAM'],
      ['Routing protocol messages discover ____ routers.', 'Neighboring'],
      ['A route is installed if no source has lower ____.', 'Administrative Distance / AD'],
      ['Router uses ____ prefix match.', 'Longest'],
      ['Static routes are configured ____.', 'Manually'],
      ['Dynamic routes are learned ____.', 'Automatically'],
      ['Distance-vector uses ____ algorithm.', 'Bellman-Ford'],
      ['Link-state uses ____ algorithm.', 'Dijkstra'],
      ['RIP is ____ vector.', 'Distance'],
      ['OSPF is ____ state.', 'Link']
    ],
    sa: [
      ['Define routing algorithm.', 'A method/protocol used by routers to choose the best path for packets.'],
      ['List routing algorithm steps.', 'Information gathering, path calculation, routing table update, forwarding packets.'],
      ['List dynamic routing protocol components.', 'Data structures, routing protocol messages, and an algorithm.'],
      ['Define fault tolerance.', 'Ability to limit failure impact by using redundant paths and rerouting traffic.'],
      ['Define scalability.', 'Ability of the network to grow without degrading existing services.'],
      ['Define QoS.', 'A mechanism for reliable delivery and prioritization, especially for voice/live video.'],
      ['Security goals?', 'Confidentiality, integrity, availability.'],
      ['Define AD.', 'Administrative distance is a preference value between different route sources; lower is preferred.'],
      ['Define metric.', 'A value used inside a routing protocol to choose the best path; lower is usually preferred.']
    ],
    compare: [
      ['Static Routing', 'Dynamic Routing', [['Manual', 'Automatic'], ['Low overhead', 'Protocol overhead'], ['No auto adaptation', 'Adapts to changes'], ['Small stable networks', 'Large changing networks']]],
      ['Distance-Vector', 'Link-State', [['Shares routes with neighbors', 'Shares link-state topology'], ['Bellman-Ford', 'Dijkstra'], ['Example RIP', 'Example OSPF'], ['Simple', 'Fast convergence/scalable']]],
      ['AD', 'Metric', [['Compares route sources', 'Compares paths in same protocol'], ['Lower AD wins', 'Lower metric wins'], ['Static vs RIP vs OSPF', 'Hop count or cost']]]
    ]
  },
  {
    id: 'rip',
    title: 'RIP',
    source: 'Lecture 4 PDF: RIP, RIPv1, RIPv2, RIPng, hop count, classful/classless, update behavior.',
    focus: ['Distance-vector', 'Hop Count', '15 Max', 'RIPv1 vs RIPv2', 'RIPng'],
    mcq: [
      ['RIP stands for ____.', 'Routing Information Protocol'],
      ['RIP is a ____ routing protocol.', 'Dynamic'],
      ['RIP is a ____ protocol.', 'Distance-vector'],
      ['RIP is used in ____ to medium networks.', 'Small'],
      ['RIP metric is ____.', 'Hop count'],
      ['RIP maximum hop count is ____.', '15'],
      ['RIPv1 is ____.', 'Classful'],
      ['RIPv2 is ____.', 'Classless'],
      ['RIPv2 supports ____ and CIDR.', 'VLSM'],
      ['RIP updates use UDP port ____.', '520'],
      ['RIP sends updates every ____ seconds.', '30'],
      ['RIPng supports ____.', 'IPv6'],
      ['RIPng AD is ____.', '120'],
      ['RIPv2 appeared in ____.', '1993'],
      ['RIP was introduced in ____.', '1988']
    ],
    sa: [
      ['Define RIP.', 'A dynamic distance-vector routing protocol used in small to medium-sized networks.'],
      ['What is RIP metric?', 'Hop count. Each router adds one hop.'],
      ['What is RIP maximum hop count?', '15; beyond 15 is unreachable.'],
      ['What is RIPv2?', 'A classless RIP version that supports subnet mask information, VLSM and CIDR.'],
      ['What is RIPng?', 'RIP for IPv6, based on RIPv2 and still limited to 15 hops.'],
      ['Why is RIP weak for large networks?', 'It has 15-hop limit and slower convergence than link-state protocols.']
    ],
    compare: [
      ['RIPv1', 'RIPv2', [['Classful', 'Classless'], ['No subnet mask', 'Sends subnet mask'], ['No VLSM/CIDR', 'Supports VLSM/CIDR'], ['Older', 'Newer']]],
      ['RIP', 'OSPF', [['Distance-vector', 'Link-state'], ['Hop count', 'Cost'], ['Max 15 hops', 'Scales larger'], ['Slower convergence', 'Faster convergence']]],
      ['Classful', 'Classless', [['No mask in update', 'Mask included'], ['No VLSM/CIDR', 'Supports VLSM/CIDR'], ['RIPv1', 'RIPv2/OSPF/EIGRP']]]
    ]
  },
  {
    id: 'ospf',
    title: 'OSPF',
    source: 'Lecture 5 PDF: OSPF, packets, databases, SPF, areas, OSPFv3, neighbors, DR/BDR.',
    focus: ['Link-state', 'Five Packets', 'Three Databases', 'SPF', 'Area 0', 'DR/BDR'],
    mcq: [
      ['OSPF stands for ____.', 'Open Shortest Path First'],
      ['OSPF is a ____ routing protocol.', 'Link-state'],
      ['OSPF was developed as an alternative to ____.', 'RIP'],
      ['OSPF metric is ____.', 'Cost'],
      ['OSPF uses ____ algorithm.', 'Dijkstra SPF'],
      ['OSPF uses ____ packet types.', 'Five'],
      ['Neighbor discovery packet is ____.', 'Hello'],
      ['Database Description abbreviation is ____.', 'DBD'],
      ['Link-State Request abbreviation is ____.', 'LSR'],
      ['Link-State Update abbreviation is ____.', 'LSU'],
      ['Link-State Acknowledgment abbreviation is ____.', 'LSAck'],
      ['Adjacency database is ____ table.', 'Neighbor'],
      ['LSDB is ____ table.', 'Topology'],
      ['Best practice area is area ____.', '0'],
      ['Routers connecting areas are ____.', 'ABRs'],
      ['OSPFv3 supports ____ prefixes.', 'IPv6'],
      ['Hello multicast address is ____.', '224.0.0.5'],
      ['Router ID is ____ bits.', '32'],
      ['Priority 0 means cannot become ____.', 'DR/BDR']
    ],
    sa: [
      ['Define OSPF.', 'A link-state routing protocol using SPF/Dijkstra and areas; faster and more scalable than RIP.'],
      ['List OSPF packet types.', 'Hello, DBD, LSR, LSU, LSAck.'],
      ['What are OSPF databases?', 'Adjacency/neighbor table, LSDB/topology table, and forwarding database/routing table.'],
      ['What is LSDB?', 'A topology database containing link-state information; identical for routers in the same area.'],
      ['List OSPF operation steps.', 'Establish adjacencies, exchange LSAs, build LSDB, execute SPF, choose best route.'],
      ['What is multiarea OSPF?', 'OSPF with multiple areas connected to backbone area 0 through ABRs.'],
      ['What is router ID?', 'A 32-bit value formatted like IPv4 to uniquely identify an OSPF router.'],
      ['Why use DR/BDR?', 'To reduce excessive adjacencies and LSA flooding on multiaccess networks.']
    ],
    compare: [
      ['Neighbor Table', 'Topology Table / LSDB', [['Neighbors only', 'Full link-state topology'], ['Unique per router', 'Identical within area'], ['show ip ospf neighbor', 'show ip ospf database']]],
      ['Single-Area OSPF', 'Multiarea OSPF', [['One area', 'Multiple areas'], ['Simple', 'Scalable'], ['Best practice area 0', 'All areas connect to area 0'], ['Larger LSDB in big networks', 'Smaller tables and fewer SPF runs']]],
      ['OSPFv2', 'OSPFv3', [['IPv4', 'IPv6'], ['IPv4 transport', 'IPv6 transport'], ['IPv4 routes', 'IPv6 prefixes'], ['Same logic', 'Independent process']]],
      ['DR', 'BDR', [['Main designated router', 'Backup router'], ['Central LSA exchange', 'Takes over if DR fails'], ['Highest priority/router ID', 'Second best']]]
    ]
  },
  {
    id: 'vlan',
    title: 'VLAN',
    source: 'VLAN PDF: LAN drawbacks, VLAN definition, advantages, trunking, 802.1Q fields, filtering.',
    focus: ['Layer 2 Broadcast Domain', 'Logical Segmentation', 'Trunk', '802.1Q', 'Filtering'],
    mcq: [
      ['VLAN stands for ____.', 'Virtual Local Area Network'],
      ['VLANs are based on ____ connections.', 'Logical'],
      ['VLANs define broadcast domains in Layer ____.', '2'],
      ['A VLAN groups devices as if attached to the same ____.', 'Wire'],
      ['VLAN solves lack of traffic ____.', 'Isolation'],
      ['VLAN advantages include performance, virtual workgroups, simplified administration, reduced cost, and ____.', 'Security'],
      ['A trunk carries traffic for ____ VLANs.', 'Multiple'],
      ['IEEE 802.1Q is standard VLAN ____.', 'Tagging / trunking'],
      ['ISL is ____ proprietary.', 'Cisco'],
      ['802.1Q tag size is ____ bytes.', '4'],
      ['802.1Q TPID is ____.', '0x8100'],
      ['PRI field is ____ bits.', '3'],
      ['PRI supports ____ priority levels.', '8'],
      ['VLAN ID is ____ bits.', '12'],
      ['VLAN ID range is 0 to ____.', '4095']
    ],
    sa: [
      ['Define VLAN.', 'A group of devices on one or more LANs configured to communicate as if attached to the same wire, independent of physical location.'],
      ['Why are VLANs flexible?', 'Because they use logical grouping instead of physical cabling/location.'],
      ['What problems do VLANs solve?', 'Traffic isolation, inefficient switch use, and user management problems.'],
      ['List VLAN advantages.', 'Performance, virtual workgroups, simplified administration, reduced cost, security.'],
      ['Define trunk link.', 'A link carrying traffic for multiple VLANs using tags.'],
      ['Define 802.1Q.', 'An industry-standard VLAN tagging/trunking method that inserts a 4-byte tag.'],
      ['What does VLAN ID do?', 'Identifies which VLAN a frame belongs to.']
    ],
    compare: [
      ['Normal LAN', 'VLAN', [['Physical grouping', 'Logical grouping'], ['Broadcast can spread widely', 'Broadcast isolated per VLAN'], ['Moving users may need cabling', 'Logical reassignment'], ['Less isolation', 'Better isolation/security']]],
      ['Access Link', 'Trunk Link', [['One VLAN', 'Multiple VLANs'], ['End device link', 'Switch/router link'], ['Usually untagged', 'Usually tagged'], ['Simple', 'Needs filtering/tagging']]],
      ['ISL', '802.1Q', [['Cisco proprietary', 'Industry standard'], ['Legacy', 'Common'], ['Encapsulation style', '4-byte tag']]]
    ]
  },
  {
    id: 'routing-packets',
    title: 'Routing Packets / Layer 2 Switching',
    source: 'Lecture 8 PDF: communication through two switches, MAC learning, flooding, filtering, Layer 2 vs Layer 3.',
    focus: ['MAC Learning', 'Flooding', 'Filtering', 'Known/Unknown MAC', 'Layer 2 vs Layer 3'],
    mcq: [
      ['Switches use information in the Layer ____ header.', '2'],
      ['Switches forward frames using ____ addresses.', 'MAC'],
      ['Layer 3 header contains source and destination ____ addresses.', 'IP'],
      ['Layer 2 header contains source and destination ____ addresses.', 'MAC'],
      ['Initial MAC address tables are ____.', 'Empty'],
      ['A switch learns MAC from the ____ MAC field.', 'Source'],
      ['Unknown destination MAC causes ____.', 'Flooding'],
      ['Flooding excludes the ____ port.', 'Incoming / received'],
      ['Not sending back out the same port is ____ behavior.', 'Filtering'],
      ['Non-destination host silently ____ the frame.', 'Discards'],
      ['Intended destination host ____ the frame.', 'Accepts'],
      ['On return path less flooding occurs because switches have ____ MACs.', 'Learned'],
      ['Switches learn MAC tables ____.', 'Independently'],
      ['Switches do not share ____ tables.', 'MAC address'],
      ['IP is implemented at routers and ____.', 'Hosts']
    ],
    sa: [
      ['How does a switch learn MAC addresses?', 'It reads the source MAC of each received frame and records the ingress port.'],
      ['What happens when destination MAC is unknown?', 'The switch floods the frame out all ports except the incoming port.'],
      ['Define filtering behavior.', 'A switch does not send a frame back out the port where it was received.'],
      ['What does a non-destination host do?', 'It checks the destination MAC and silently discards the frame if not addressed to it.'],
      ['Why is return traffic simpler?', 'Switches already learned MAC locations from previous frames.'],
      ['Do switches share MAC tables?', 'No, each switch learns independently.']
    ],
    compare: [
      ['First Frame A → B', 'Return Frame B → A', [['Tables empty', 'Some MACs learned'], ['Unknown destination causes flood', 'Known destination forwarded'], ['Learns A MAC', 'Learns B MAC'], ['More flooding', 'Less/no flooding']]],
      ['Layer 2 Switching', 'Layer 3 Routing', [['Uses MAC', 'Uses IP'], ['Frames', 'Packets'], ['Unknown MAC → flood', 'No route → drop'], ['Local LAN', 'Between networks']]],
      ['MAC Address', 'IP Address', [['Layer 2', 'Layer 3'], ['Switching', 'Routing'], ['Physical/local', 'Logical/network']]]
    ]
  }
];

function installExamBankStyles() {
  if (document.getElementById('exam-bank-styles')) return;
  const style = document.createElement('style');
  style.id = 'exam-bank-styles';
  style.textContent = `
    .exam-bank-panel{margin:1.5rem 0 2rem;padding:1rem;border:1px solid rgba(56,189,248,.22);border-radius:24px;background:linear-gradient(135deg,rgba(15,23,42,.96),rgba(15,23,42,.82));box-shadow:0 18px 45px rgba(2,6,23,.18)}
    .exam-bank-head{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;margin-bottom:1rem;flex-wrap:wrap}.exam-bank-head h3{margin:.2rem 0;color:#f8fafc}.exam-bank-head p{margin:.25rem 0;color:#cbd5e1}.exam-bank-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin:.5rem 0}.exam-bank-search{width:min(100%,380px);padding:.7rem .9rem;border-radius:999px;border:1px solid rgba(148,163,184,.35);background:rgba(255,255,255,.08);color:#fff}.exam-filter{border:1px solid rgba(148,163,184,.25);background:rgba(15,23,42,.62);color:#e2e8f0;border-radius:999px;padding:.45rem .75rem;cursor:pointer;font-weight:800}.exam-filter.active,.exam-filter:hover{background:#38bdf8;color:#082f49;border-color:#38bdf8}
    .exam-bank-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem}.exam-bank-card{border:1px solid rgba(148,163,184,.22);background:#fff;border-radius:20px;overflow:hidden}.exam-bank-card-head{padding:1rem;background:linear-gradient(135deg,#e0f2fe,#f8fafc);border-bottom:1px solid #cbd5e1}.exam-bank-card-head h4{margin:0;color:#0f172a}.exam-source{font-size:.82rem;color:#334155;margin:.35rem 0 0}.exam-focus{display:flex;gap:.35rem;flex-wrap:wrap;margin-top:.7rem}.exam-focus span{font-size:.72rem;padding:.28rem .5rem;border-radius:999px;background:#0f766e;color:#ecfeff;font-weight:700}
    .exam-tabs{display:flex;gap:.4rem;padding:.75rem .75rem 0;flex-wrap:wrap}.exam-tab{border:0;border-radius:999px;padding:.38rem .65rem;background:#e2e8f0;color:#0f172a;font-weight:800;cursor:pointer}.exam-tab.active{background:#0f766e;color:white}.exam-content{padding:1rem}.exam-section{display:none}.exam-section.active{display:block}.exam-list{display:grid;gap:.55rem}.exam-item{padding:.65rem .75rem;border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc}.exam-item strong{color:#0f766e}.exam-q{font-weight:800;color:#0f172a}.exam-a{margin-top:.25rem;color:#334155}.exam-compare{margin-bottom:.9rem}.exam-compare h5{margin:.4rem 0;color:#0f172a}.exam-compare table{width:100%;border-collapse:collapse;font-size:.9rem}.exam-compare th{background:#0f172a;color:#fff}.exam-compare td,.exam-compare th{border:1px solid #cbd5e1;padding:.45rem;text-align:left;vertical-align:top}.exam-compare tr:nth-child(even) td{background:#f8fafc}.exam-bank-empty{padding:1rem;color:#fff;text-align:center}.exam-bank-foot{margin-top:1rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem}.exam-memory{padding:.8rem;border-radius:16px;background:#fef3c7;color:#78350f;border:1px solid #f59e0b;font-weight:800;text-align:center}
    @media(max-width:700px){.exam-bank-panel{padding:.75rem;border-radius:18px}.exam-bank-head{display:block}.exam-bank-search{width:100%}.exam-compare table{font-size:.82rem}}
  `;
  document.head.appendChild(style);
}

function buildExamBank() {
  installExamBankStyles();
  const summary = document.getElementById('cheat-sheet-summary');
  if (!summary || document.getElementById('network-exam-bank')) return;
  const panel = document.createElement('div');
  panel.id = 'network-exam-bank';
  panel.className = 'exam-bank-panel';
  panel.innerHTML = `
    <div class="exam-bank-head">
      <div><p class="section-kicker">Question Bank</p><h3>MCQs · Short Answers · Compare/VS</h3><p>Smart exam bank covering every uploaded Network lecture. Search, filter, and switch between MCQ/SA/Compare.</p></div>
      <input id="exam-bank-search" class="exam-bank-search" type="search" placeholder="Search RIP, OSPF, VLAN, forwarding...">
    </div>
    <div class="exam-bank-actions" id="exam-bank-filters"></div>
    <div class="exam-bank-grid" id="exam-bank-grid"></div>
    <div class="exam-bank-foot"><div class="exam-memory">Routing = best path</div><div class="exam-memory">Forwarding = output interface</div><div class="exam-memory">RIP = hop count / 15 max</div><div class="exam-memory">OSPF = link-state / cost</div><div class="exam-memory">VLAN = L2 broadcast domain</div><div class="exam-memory">Unknown MAC = flood</div></div>
  `;
  summary.insertAdjacentElement('afterend', panel);
  const filters = document.getElementById('exam-bank-filters');
  const grid = document.getElementById('exam-bank-grid');
  const search = document.getElementById('exam-bank-search');
  let active = 'all';
  filters.innerHTML = `<button class="exam-filter active" data-id="all">All</button>` + NETWORK_EXAM_BANK.map((ch) => `<button class="exam-filter" data-id="${ch.id}">${ch.title.split(' ')[0]}</button>`).join('');
  function render() {
    const q = search.value.trim().toLowerCase();
    const chapters = NETWORK_EXAM_BANK.filter((ch) => (active === 'all' || ch.id === active) && (!q || JSON.stringify(ch).toLowerCase().includes(q)));
    grid.innerHTML = chapters.length ? chapters.map((ch) => `
      <article class="exam-bank-card" data-exam-card>
        <div class="exam-bank-card-head"><h4>${ch.title}</h4><p class="exam-source">Source: ${ch.source}</p><div class="exam-focus">${ch.focus.map((x) => `<span>${x}</span>`).join('')}</div></div>
        <div class="exam-tabs"><button class="exam-tab active" data-tab="mcq">MCQ</button><button class="exam-tab" data-tab="sa">SA</button><button class="exam-tab" data-tab="compare">Compare</button></div>
        <div class="exam-content">
          <section class="exam-section active" data-panel="mcq"><div class="exam-list">${ch.mcq.map((x,i) => `<div class="exam-item"><div class="exam-q">Q${i+1}. ${x[0]}</div><div class="exam-a"><strong>Answer:</strong> ${x[1]}</div></div>`).join('')}</div></section>
          <section class="exam-section" data-panel="sa"><div class="exam-list">${ch.sa.map((x,i) => `<div class="exam-item"><div class="exam-q">Q${i+1}. ${x[0]}</div><div class="exam-a">${x[1]}</div></div>`).join('')}</div></section>
          <section class="exam-section" data-panel="compare">${ch.compare.map((t) => `<div class="exam-compare"><h5>${t[0]} vs ${t[1]}</h5><table><thead><tr><th>${t[0]}</th><th>${t[1]}</th></tr></thead><tbody>${t[2].map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div>`).join('')}</section>
        </div>
      </article>`).join('') : '<div class="exam-bank-empty">No matching exam-bank content found.</div>';
  }
  filters.addEventListener('click', (e) => { const btn = e.target.closest('.exam-filter'); if (!btn) return; active = btn.dataset.id; filters.querySelectorAll('.exam-filter').forEach((b) => b.classList.remove('active')); btn.classList.add('active'); render(); });
  search.addEventListener('input', render);
  grid.addEventListener('click', (e) => { const tab = e.target.closest('.exam-tab'); if (!tab) return; const card = tab.closest('[data-exam-card]'); card.querySelectorAll('.exam-tab,.exam-section').forEach((x) => x.classList.remove('active')); tab.classList.add('active'); card.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('active'); });
  render();
}

document.addEventListener('DOMContentLoaded', buildExamBank);
