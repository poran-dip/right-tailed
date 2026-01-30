import mongoose from 'mongoose'
import { Department, Subject } from '@/models'

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)

    // Clear existing data
    await Department.deleteMany({})
    await Subject.deleteMany({})

    // Create Departments
    const csDept = await Department.create({
      code: 'CSE',
      name: 'Computer Science and Engineering',
      subjects: []
    })

    const eceDept = await Department.create({
      code: 'ECE',
      name: 'Electronics and Communication Engineering',
      subjects: []
    })

    const eeDept = await Department.create({
      code: 'EE',
      name: 'Electrical Engineering',
      subjects: []
    })

    // CSE Subjects
    const csSubjects = [
      {
        name: 'Data Structures and Algorithms',
        departmentId: csDept._id,
        semester: 3,
        topics: [
          {
            name: 'Arrays and Linked Lists',
            keywords: ['array operations', 'dynamic arrays', 'singly linked list', 'doubly linked list']
          },
          {
            name: 'Trees and Graphs',
            keywords: ['binary tree', 'BST', 'AVL tree', 'graph traversal']
          },
          {
            name: 'Sorting Algorithms',
            keywords: ['quicksort', 'mergesort', 'heapsort', 'time complexity']
          },
          {
            name: 'Dynamic Programming',
            keywords: ['memoization', 'tabulation', 'optimal substructure', 'overlapping subproblems']
          }
        ]
      },
      {
        name: 'Database Management Systems',
        departmentId: csDept._id,
        semester: 4,
        topics: [
          {
            name: 'Relational Model',
            keywords: ['relations', 'keys', 'foreign key', 'relational algebra']
          },
          {
            name: 'SQL and Queries',
            keywords: ['SELECT', 'JOIN', 'aggregate functions', 'subqueries']
          },
          {
            name: 'Normalization',
            keywords: ['functional dependencies', '1NF', '2NF', '3NF', 'BCNF']
          },
          {
            name: 'Transaction Management',
            keywords: ['ACID properties', 'concurrency control', 'locking', 'deadlock']
          }
        ]
      },
      {
        name: 'Operating Systems',
        departmentId: csDept._id,
        semester: 5,
        topics: [
          {
            name: 'Process Management',
            keywords: ['process scheduling', 'context switching', 'PCB', 'multithreading']
          },
          {
            name: 'Memory Management',
            keywords: ['paging', 'segmentation', 'virtual memory', 'page replacement']
          },
          {
            name: 'File Systems',
            keywords: ['inode', 'directory structure', 'file allocation', 'disk scheduling']
          },
          {
            name: 'Synchronization',
            keywords: ['semaphores', 'mutex', 'deadlock prevention', 'critical section']
          }
        ]
      },
      {
        name: 'Computer Networks',
        departmentId: csDept._id,
        semester: 6,
        topics: [
          {
            name: 'Network Layers',
            keywords: ['OSI model', 'TCP/IP', 'application layer', 'transport layer']
          },
          {
            name: 'Routing Algorithms',
            keywords: ['distance vector', 'link state', 'OSPF', 'BGP']
          },
          {
            name: 'Data Link Layer',
            keywords: ['framing', 'error detection', 'MAC protocols', 'Ethernet']
          },
          {
            name: 'Network Security',
            keywords: ['encryption', 'firewalls', 'SSL/TLS', 'authentication']
          }
        ]
      }
    ]

    // ECE Subjects
    const eceSubjects = [
      {
        name: 'Analog Electronics',
        departmentId: eceDept._id,
        semester: 3,
        topics: [
          {
            name: 'Diode Circuits',
            keywords: ['PN junction', 'rectifiers', 'clippers', 'clampers']
          },
          {
            name: 'Transistor Amplifiers',
            keywords: ['BJT', 'common emitter', 'voltage gain', 'frequency response']
          },
          {
            name: 'Operational Amplifiers',
            keywords: ['op-amp', 'inverting amplifier', 'differential amplifier', 'integrator']
          },
          {
            name: 'Oscillators',
            keywords: ['RC oscillator', 'LC oscillator', 'crystal oscillator', 'Barkhausen criterion']
          }
        ]
      },
      {
        name: 'Digital Signal Processing',
        departmentId: eceDept._id,
        semester: 5,
        topics: [
          {
            name: 'Z-Transform',
            keywords: ['ROC', 'inverse z-transform', 'transfer function', 'stability']
          },
          {
            name: 'Digital Filters',
            keywords: ['FIR', 'IIR', 'filter design', 'frequency response']
          },
          {
            name: 'FFT Algorithms',
            keywords: ['DFT', 'decimation in time', 'decimation in frequency', 'butterfly structure']
          },
          {
            name: 'Sampling Theory',
            keywords: ['Nyquist rate', 'aliasing', 'quantization', 'reconstruction']
          }
        ]
      },
      {
        name: 'Electromagnetic Theory',
        departmentId: eceDept._id,
        semester: 4,
        topics: [
          {
            name: 'Maxwell\'s Equations',
            keywords: ['Gauss law', 'Faraday law', 'Ampere law', 'displacement current']
          },
          {
            name: 'Wave Propagation',
            keywords: ['plane waves', 'wave equation', 'Poynting vector', 'skin depth']
          },
          {
            name: 'Transmission Lines',
            keywords: ['characteristic impedance', 'reflection coefficient', 'standing waves', 'Smith chart']
          },
          {
            name: 'Waveguides',
            keywords: ['rectangular waveguide', 'TE modes', 'TM modes', 'cutoff frequency']
          }
        ]
      },
      {
        name: 'Communication Systems',
        departmentId: eceDept._id,
        semester: 6,
        topics: [
          {
            name: 'Amplitude Modulation',
            keywords: ['AM', 'DSB-SC', 'SSB', 'modulation index']
          },
          {
            name: 'Frequency Modulation',
            keywords: ['FM', 'PM', 'deviation ratio', 'Carson\'s rule']
          },
          {
            name: 'Digital Modulation',
            keywords: ['ASK', 'FSK', 'PSK', 'QAM']
          },
          {
            name: 'Information Theory',
            keywords: ['entropy', 'channel capacity', 'Shannon theorem', 'source coding']
          }
        ]
      }
    ]

    // EE Subjects
    const eeSubjects = [
      {
        name: 'Power Systems',
        departmentId: eeDept._id,
        semester: 5,
        topics: [
          {
            name: 'Power Generation',
            keywords: ['synchronous generator', 'excitation', 'power factor', 'armature reaction']
          },
          {
            name: 'Transmission Lines',
            keywords: ['ABCD parameters', 'line losses', 'corona', 'sag and tension']
          },
          {
            name: 'Load Flow Analysis',
            keywords: ['bus admittance', 'Gauss-Seidel', 'Newton-Raphson', 'power flow']
          },
          {
            name: 'Fault Analysis',
            keywords: ['symmetrical components', 'sequence networks', 'short circuit', 'protective relays']
          }
        ]
      },
      {
        name: 'Control Systems',
        departmentId: eeDept._id,
        semester: 4,
        topics: [
          {
            name: 'Transfer Functions',
            keywords: ['Laplace transform', 'block diagrams', 'signal flow graphs', 'Mason\'s gain']
          },
          {
            name: 'Time Response',
            keywords: ['transient response', 'steady state error', 'rise time', 'settling time']
          },
          {
            name: 'Frequency Response',
            keywords: ['Bode plot', 'Nyquist plot', 'gain margin', 'phase margin']
          },
          {
            name: 'Stability Analysis',
            keywords: ['Routh-Hurwitz', 'root locus', 'stability criteria', 'pole placement']
          }
        ]
      },
      {
        name: 'Electrical Machines',
        departmentId: eeDept._id,
        semester: 3,
        topics: [
          {
            name: 'DC Machines',
            keywords: ['DC motor', 'back EMF', 'torque equation', 'speed control']
          },
          {
            name: 'Transformers',
            keywords: ['ideal transformer', 'equivalent circuit', 'regulation', 'losses']
          },
          {
            name: 'Induction Motors',
            keywords: ['rotating magnetic field', 'slip', 'torque-slip characteristics', 'starting methods']
          },
          {
            name: 'Synchronous Machines',
            keywords: ['synchronous motor', 'phasor diagram', 'V-curves', 'hunting']
          }
        ]
      },
      {
        name: 'Power Electronics',
        departmentId: eeDept._id,
        semester: 6,
        topics: [
          {
            name: 'Rectifiers',
            keywords: ['controlled rectifier', 'thyristor', 'phase control', 'ripple factor']
          },
          {
            name: 'DC-DC Converters',
            keywords: ['buck converter', 'boost converter', 'buck-boost', 'duty cycle']
          },
          {
            name: 'Inverters',
            keywords: ['voltage source inverter', 'PWM', 'harmonic distortion', 'SPWM']
          },
          {
            name: 'AC Voltage Controllers',
            keywords: ['AC chopper', 'triac', 'cycloconverter', 'phase control']
          }
        ]
      }
    ]

    // Insert all subjects
    const insertedCSSubjects = await Subject.insertMany(csSubjects)
    const insertedECESubjects = await Subject.insertMany(eceSubjects)
    const insertedEESubjects = await Subject.insertMany(eeSubjects)

    // Update departments with subject IDs
    await Department.findByIdAndUpdate(csDept._id, {
      subjects: insertedCSSubjects.map(s => s._id)
    })

    await Department.findByIdAndUpdate(eceDept._id, {
      subjects: insertedECESubjects.map(s => s._id)
    })

    await Department.findByIdAndUpdate(eeDept._id, {
      subjects: insertedEESubjects.map(s => s._id)
    })

    console.log('✅ Seed data created successfully!')
    console.log(`📚 Departments: ${[csDept, eceDept, eeDept].length}`)
    console.log(`📖 Subjects: ${insertedCSSubjects.length + insertedECESubjects.length + insertedEESubjects.length}`)

  } catch (error) {
    console.error('❌ Error seeding data:', error)
  } finally {
    await mongoose.disconnect()
  }
}

seedData()
