import lectureContent from './lecture-content.js';

export const cheatSheetData = lectureContent.flatMap((topic) => {
  const items = [
    { topic: topic.title, content: topic.concept.en, link: `#${topic.id}` },
    { topic: `${topic.title} Why It Matters`, content: topic.whyItMatters.en, link: `#${topic.id}` }
  ];

  if (topic.compare) {
    items.push({
      topic: topic.compare.title,
      content: topic.compare.rows.map((row) => row.join(' | ')).join(' ; '),
      link: '#cheat-sheet'
    });
  }

  return items;
});

export const commandData = lectureContent.flatMap((topic) =>
  topic.commands.map((command) => ({
    cmd: command.cmd,
    desc: command.desc,
    category: topic.title,
    link: '#commands'
  }))
);

export const visualizerData = [
  {
    title: 'Packet Forwarding Steps',
    desc: 'Ingress frame, route lookup, TTL update, ARP/next-hop, new Layer 2 frame.',
    link: '#visualizer'
  },
  {
    title: 'RIP Update Flow',
    desc: 'Hop count grows per router and route poisoning marks metric 16.',
    link: '#visualizer'
  },
  {
    title: 'OSPF LSDB to SPF',
    desc: 'Hello, DBD, LSR, LSU, LSAck, LSDB sync, SPF, routing table.',
    link: '#visualizer'
  },
  {
    title: 'VLAN Tagging',
    desc: 'Access untagged, trunk tagged, router-on-a-stick subinterfaces.',
    link: '#visualizer'
  },
  {
    title: 'MAC Learning',
    desc: 'Learn source MAC, flood unknown destination, then unicast after reply.',
    link: '#visualizer'
  }
];
