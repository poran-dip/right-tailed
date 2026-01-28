export const departments = [
  // Engineering
  { id: 'btech-cse', name: 'B.Tech Computer Science & Engineering', category: 'Engineering' },
  { id: 'btech-ece', name: 'B.Tech Electronics & Communication', category: 'Engineering' },
  { id: 'btech-mech', name: 'B.Tech Mechanical Engineering', category: 'Engineering' },
  { id: 'btech-civil', name: 'B.Tech Civil Engineering', category: 'Engineering' },
  { id: 'btech-eee', name: 'B.Tech Electrical & Electronics', category: 'Engineering' },
  
  // Computer Applications
  { id: 'bca', name: 'BCA (Computer Applications)', category: 'Computer Applications' },
  { id: 'mca', name: 'MCA (Computer Applications)', category: 'Computer Applications' },
  
  // Pharmacy
  { id: 'bpharm', name: 'B.Pharm (Pharmacy)', category: 'Pharmacy' },
  { id: 'dpharm', name: 'D.Pharm (Pharmacy)', category: 'Pharmacy' },
  
  // Commerce & Business
  { id: 'bcom', name: 'B.Com (Commerce)', category: 'Commerce' },
  { id: 'bba', name: 'BBA (Business Administration)', category: 'Business' },
  { id: 'mba', name: 'MBA (Business Administration)', category: 'Business' },
  
  // Science
  { id: 'bsc-physics', name: 'B.Sc Physics', category: 'Science' },
  { id: 'bsc-chemistry', name: 'B.Sc Chemistry', category: 'Science' },
  { id: 'bsc-maths', name: 'B.Sc Mathematics', category: 'Science' },
  
  // Law
  { id: 'llb', name: 'LLB (Bachelor of Laws)', category: 'Law' },
  { id: 'ballb', name: 'BA LLB (Integrated Law)', category: 'Law' },
];

export const entranceExams = [
  // Engineering
  { id: 'jee-mains', name: 'JEE Mains', category: 'Engineering' },
  { id: 'jee-advanced', name: 'JEE Advanced', category: 'Engineering' },
  { id: 'bitsat', name: 'BITSAT', category: 'Engineering' },
  { id: 'viteee', name: 'VITEEE', category: 'Engineering' },
  { id: 'srmjeee', name: 'SRMJEEE', category: 'Engineering' },
  { id: 'wbjee', name: 'WBJEE', category: 'Engineering' },
  { id: 'mht-cet', name: 'MHT CET', category: 'Engineering' },
  { id: 'kcet', name: 'KCET', category: 'Engineering' },
  { id: 'gate', name: 'GATE', category: 'Engineering' },
  
  // Medical
  { id: 'neet-ug', name: 'NEET UG', category: 'Medical' },
  { id: 'neet-pg', name: 'NEET PG', category: 'Medical' },
  { id: 'aiims', name: 'AIIMS', category: 'Medical' },
  { id: 'jipmer', name: 'JIPMER', category: 'Medical' },
  
  // Management
  { id: 'cat', name: 'CAT', category: 'Management' },
  { id: 'xat', name: 'XAT', category: 'Management' },
  { id: 'mat', name: 'MAT', category: 'Management' },
  { id: 'cmat', name: 'CMAT', category: 'Management' },
  { id: 'snap', name: 'SNAP', category: 'Management' },
  { id: 'nmat', name: 'NMAT', category: 'Management' },
  { id: 'iift', name: 'IIFT', category: 'Management' },
  
  // Law
  { id: 'clat', name: 'CLAT', category: 'Law' },
  { id: 'ailet', name: 'AILET', category: 'Law' },
  { id: 'lsat-india', name: 'LSAT India', category: 'Law' },
  
  // Civil Services
  { id: 'upsc-cse', name: 'UPSC CSE', category: 'Civil Services' },
  { id: 'upsc-capf', name: 'UPSC CAPF', category: 'Civil Services' },
  { id: 'ssc-cgl', name: 'SSC CGL', category: 'Civil Services' },
  { id: 'ssc-chsl', name: 'SSC CHSL', category: 'Civil Services' },
  
  // Banking & Finance
  { id: 'ibps-po', name: 'IBPS PO', category: 'Banking' },
  { id: 'ibps-clerk', name: 'IBPS Clerk', category: 'Banking' },
  { id: 'sbi-po', name: 'SBI PO', category: 'Banking' },
  { id: 'rbi-grade-b', name: 'RBI Grade B', category: 'Banking' },
  
  // Computer Applications
  { id: 'nimcet', name: 'NIMCET', category: 'Computer Applications' },
  
  // Pharmacy
  { id: 'gpat', name: 'GPAT', category: 'Pharmacy' },
  { id: 'niper-jee', name: 'NIPER JEE', category: 'Pharmacy' },
  
  // Architecture & Design
  { id: 'nata', name: 'NATA', category: 'Architecture' },
  { id: 'jee-arch', name: 'JEE (B.Arch)', category: 'Architecture' },
  { id: 'nid-dat', name: 'NID DAT', category: 'Design' },
  { id: 'uceed', name: 'UCEED', category: 'Design' },
  { id: 'ceed', name: 'CEED', category: 'Design' },
  
  // Agriculture
  { id: 'icar-aieea', name: 'ICAR AIEEA', category: 'Agriculture' },
  
  // Science
  { id: 'jest', name: 'JEST', category: 'Science' },
  { id: 'iit-jam', name: 'IIT JAM', category: 'Science' },
  { id: 'cuet-pg', name: 'CUET PG', category: 'Science' },
  
  // Commerce
  { id: 'cuet-ug', name: 'CUET UG', category: 'General' },
  { id: 'du-jat', name: 'DU JAT', category: 'Commerce' },
  { id: 'npat', name: 'NPAT', category: 'Commerce' },
  
  // Defence
  { id: 'nda', name: 'NDA', category: 'Defence' },
  { id: 'cds', name: 'CDS', category: 'Defence' },
  { id: 'afcat', name: 'AFCAT', category: 'Defence' },
];

export const syllabus = {
  "name": "Computer Networks",
  "topics": [
    "Data Communication Components",
    "Data Representation and Flow",
    "Networks and Connection Topologies",
    "Protocols and Standards",
    "OSI Model",
    "Transmission Media Types",
    "Wired LAN Technologies",
    "Wireless LAN Technologies",
    "Connecting LANs",
    "Virtual LAN (VLAN)",
    "Multiplexing Concepts",
    "Frequency Division Multiplexing (FDM)",
    "Time Division Multiplexing (TDM)",
    "Wavelength Division Multiplexing (WDM)",
    "Spread Spectrum Concepts",
    "Error Detection Fundamentals",
    "Block Coding",
    "Hamming Distance",
    "Cyclic Redundancy Check (CRC)",
    "Stop and Wait Protocol",
    "Go-Back-N ARQ",
    "Selective Repeat ARQ",
    "Sliding Window Protocol",
    "Piggybacking",
    "Random Access Concepts",
    "Pure ALOHA",
    "Slotted ALOHA",
    "CSMA/CD",
    "CSMA/CA",
    "Switching Techniques",
    "IPv4 Addressing",
    "IPv6 Addressing",
    "Subnetting and Supernetting",
    "Address Resolution Protocol (ARP)",
    "Reverse ARP (RARP)",
    "BOOTP and DHCP",
    "Delivery and Forwarding",
    "Unicast Routing Protocols",
    "Process-to-Process Communication",
    "User Datagram Protocol (UDP)",
    "Transmission Control Protocol (TCP)",
    "Stream Control Transmission Protocol (SCTP)",
    "Congestion Control Mechanisms",
    "Quality of Service (QoS) Concepts",
    "Leaky Bucket Algorithm",
    "Token Bucket Algorithm",
    "Domain Name System (DNS)",
    "Dynamic DNS (DDNS)",
    "TELNET Protocol",
    "Email Protocols (SMTP, POP3, IMAP)",
    "File Transfer Protocol (FTP)",
    "World Wide Web (WWW)",
    "HyperText Transfer Protocol (HTTP)",
    "Simple Network Management Protocol (SNMP)",
    "Bluetooth Technology",
    "Firewalls and Security",
    "Basic Cryptography Concepts"
  ]
}

export const questionPaper2025 = {
  "year": 2025,
  "questions": [
    {
      "question": "One example of guided media is ___",
      "marks": 1,
      "topic": "Transmission Media Types"
    },
    {
      "question": "The basic difference between a Peer-to-Peer model and a Client/Server model is ___",
      "marks": 1,
      "topic": "Networks and Connection Topologies"
    },
    {
      "question": "Example of a technology which can be used to create Personal Area Network is ___",
      "marks": 1,
      "topic": "Bluetooth Technology"
    },
    {
      "question": "Routers work in the ISO/OSI layer number ___",
      "marks": 1,
      "topic": "OSI Model"
    },
    {
      "question": "In the subnet 10.10.0.0/24, the number of usable IP addresses available is ___",
      "marks": 1,
      "topic": "Subnetting and Supernetting"
    },
    {
      "question": "For obtaining Connection-oriented service, we must use a physical media (True/False)",
      "marks": 1,
      "topic": "Data Communication Components"
    },
    {
      "question": "In a broadcast network, the name of the ISO/OSI layer which might be very thin or even non-existent is ___",
      "marks": 1,
      "topic": "OSI Model"
    },
    {
      "question": "The name of the data unit exchanged in the Data Link layer is ___",
      "marks": 1,
      "topic": "OSI Model"
    },
    {
      "question": "Example of one Application layer protocol which uses UDP as its underlying transport protocol is ___",
      "marks": 1,
      "topic": "User Datagram Protocol (UDP)"
    },
    {
      "question": "The number of bits used in IPv6 addressing is ___",
      "marks": 1,
      "topic": "IPv6 Addressing"
    },
    {
      "question": "What is meant by network topology?",
      "marks": 2,
      "topic": "Networks and Connection Topologies"
    },
    {
      "question": "Differentiate between 'Physical Topology' and Logical Topology' with a suitable example, where the physical and logical topology is not the same.",
      "marks": 4,
      "topic": "Networks and Connection Topologies"
    },
    {
      "question": "Briefly explain any three network topology including their merits and demerits.",
      "marks": 9,
      "topic": "Networks and Connection Topologies"
    },
    {
      "question": "With neat diagrams, briefly explain the working of FDM and TDM, highlighting their difference of approach.",
      "marks": 7,
      "topic": "Frequency Division Multiplexing (FDM)"
    },
    {
      "question": "Mention the responsibilities and functions provided by the Data-link layer and the Network layer, along with at-least one example each of the protocols and devices used in those layers.",
      "marks": 8,
      "topic": "OSI Model"
    },
    {
      "question": "Briefly explain the working of Pure Aloha, Slotted Aloha, and the various CSMA (1-Persistent, Non-Persistent, and p-Persistent) protocols.",
      "marks": 9,
      "topic": "Pure ALOHA"
    },
    {
      "question": "Briefly explain the working of the Leaky Bucket and the Token Bucket algorithms.",
      "marks": 6,
      "topic": "Leaky Bucket Algorithm"
    },
    {
      "question": "With a suitable example, briefly explain how private IP addressing can be useful.",
      "marks": 3,
      "topic": "IPv4 Addressing"
    },
    {
      "question": "Briefly explain the meaning and use of the 'IHL', Total Length', 'DF, 'MF, and 'TTL' field of the IP packet header.",
      "marks": 5,
      "topic": "IPv4 Addressing"
    },
    {
      "question": "For the IPv4 address 172.16.100.1 and the subnet mask (or netmask) 255.255.240.0: 1+2+2+2\n(i) Express the address in the CIDR notation\n(ii) Calculate the Network ID (or Network Address)\n(iii) Calculate the Broadcast Address\n(iv) Calculate the usable address range in the given network\nClearly show the steps of the calculations.",
      "marks": 7,
      "topic": "Subnetting and Supernetting"
    },
    {
      "question": "In a system using the CRC method for error detection for data transmission,\nif the binary data bits M(x) to be sent is 10111101, and the chosen generator\npolynomial G(x) is 10011, then: 4+3\n(i) Calculate the CRC and construct the codeword T(x) for transmission.\n(ii) Show how the receiver will check the received codeword for error.\nClearly show the steps of the calculations.",
      "marks": 7,
      "topic": "Cyclic Redundancy Check (CRC)"
    },
    {
      "question": "(i) In a Stop-and-Wait ARQ system, the bandwidth of the link is 1Mbps,\nand each bit takes 20 ms to make a round trip. If the data frames are\n1000 bits in length, calculate the efficiency and throughput of the\nsystem. 5+3\n(ii) Calculate the efficiency and throughput of the system, if it uses Sliding\nWindow protocol that can send up to 15 frames at a time.\nClearly show the steps of the calculations.",
      "marks": 8,
      "topic": "Stop and Wait Protocol"
    },
    {
      "question": "Briefly explain the essential properties of Cryptographic Hashing functions.",
      "marks": 3,
      "topic": "Basic Cryptography Concepts"
    },
    {
      "question": "Briefly explain the various messages exchanged between a DHCP client and the DHCP server to obtain the IP address and the related information by the client.",
      "marks": 4,
      "topic": "BOOTP and DHCP"
    },
    {
      "question": "Differentiate between Adaptive and Non-adaptive routing protocols.",
      "marks": 2,
      "topic": "Unicast Routing Protocols"
    },
    {
      "question": "Briefly explain any two congestion control techniques.",
      "marks": 6,
      "topic": "Congestion Control Mechanisms"
    },
    {
      "question": "Write short notes on DNS.",
      "marks": 5,
      "topic": "Domain Name System (DNS)"
    },
    {
      "question": "Write short notes on VLAN.",
      "marks": 5,
      "topic": "Virtual LAN (VLAN)"
    },
    {
      "question": "Write short notes on FTP.",
      "marks": 5,
      "topic": "File Transfer Protocol (FTP)"
    },
    {
      "question": "Write short notes on Connection-oriented vs. Connection-less Service.",
      "marks": 5,
      "topic": "Process-to-Process Communication"
    },
    {
      "question": "Write short notes on Substitution Ciphers vs. Transposition Ciphers.",
      "marks": 5,
      "topic": "Basic Cryptography Concepts"
    }
  ]
}
