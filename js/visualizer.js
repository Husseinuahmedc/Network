const visualizer = {
  renderPacketPath: (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="visualizer-box">
        <div class="host source">Host A<br><small>10.1.1.2</small></div>
        <div class="line"><div class="packet animate-packet-flow"></div></div>
        <div class="router">Router 1<br><small>L3 Switch</small></div>
        <div class="line"><div class="packet animate-packet-flow-2"></div></div>
        <div class="host destination">Host B<br><small>10.2.2.3</small></div>
      </div>
      <p class="viz-desc">Layer 3 forwarding: Router decapsulates L2, checks L3 Dest IP, then re-encapsulates for next hop.</p>
    `;
  },
  renderVlanTag: (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="vlan-tag-viz-container">
        <div class="ethernet-frame">
          <div class="frame-field">Preamble</div>
          <div class="frame-field">Dest MAC</div>
          <div class="frame-field">Src MAC</div>
          <div class="frame-field vlan-tag-highlight animate-pulse">802.1Q Tag (4 bytes)</div>
          <div class="frame-field">Type/Length</div>
          <div class="frame-field">Data</div>
        </div>
        <div class="vlan-tag-breakdown">
          <span>TPID: 0x8100</span>
          <span>TCI: PRI | DEI | <strong>VLAN ID</strong></span>
        </div>
      </div>
      <p class="viz-desc">Trunk links insert the 802.1Q tag into the Ethernet frame to identify the VLAN.</p>
    `;
  },
  renderMacLearning: (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="visualizer-box viz-column">
        <div class="viz-row-spread">
          <div class="host">H1</div><div class="host">H2</div><div class="host">H3</div>
        </div>
        <div class="switch-box animate-glow">SWITCH</div>
        <div class="flood-lines">
          <div class="flood-line fl-1"></div>
          <div class="flood-line fl-2"></div>
          <div class="flood-line fl-3"></div>
        </div>
        <div class="mac-table-container">
          <table class="mac-table-mini">
            <tr><th>Port</th><th>MAC</th></tr>
            <tr class="animate-row-appear"><td>Fa0/1</td><td>H1-MAC</td></tr>
          </table>
        </div>
      </div>
      <p class="viz-desc">Learning: Switch records Src MAC. Flooding: If Dest MAC unknown, frame sent out all ports.</p>
    `;
  },
  renderRipHop: (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="visualizer-box rip-propagation">
        <div class="router-node">R1<br><small>Net: 10.0/8</small></div>
        <div class="update-arrow animate-propagation">&rarr;</div>
        <div class="router-node">R2<br><small>Hops: 1</small></div>
        <div class="update-arrow animate-propagation-delay">&rarr;</div>
        <div class="router-node">R3<br><small>Hops: 2</small></div>
      </div>
      <p class="viz-desc">RIP: Neighbors share their routing table every 30s. Hop count increases by 1 at each neighbor.</p>
    `;
  },
  renderOspfProcess: (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="ospf-viz-flow">
        <div class="ospf-step">
          <div class="ospf-icon">🤝</div>
          <small>Hello (Neighbors)</small>
        </div>
        <div class="ospf-arrow">&rarr;</div>
        <div class="ospf-step highlight">
          <div class="ospf-icon">🗺️</div>
          <small>LSA (LSDB/Map)</small>
        </div>
        <div class="ospf-arrow">&rarr;</div>
        <div class="ospf-step pulse-ospf">
          <div class="ospf-icon">⚡</div>
          <small>SPF (Dijkstra)</small>
        </div>
        <div class="ospf-arrow">&rarr;</div>
        <div class="ospf-step">
          <div class="ospf-icon">📂</div>
          <small>Routing Table</small>
        </div>
      </div>
      <p class="viz-desc">OSPF Lifecycle: Hello &rarr; Adjacency &rarr; LSDB Exchange &rarr; SPF Calculation &rarr; Best Routes.</p>
    `;
  }
};

export default visualizer;
