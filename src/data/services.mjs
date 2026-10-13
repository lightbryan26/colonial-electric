// Service pages (brief §2 + §5). 13 pages in Services-dropdown order, then the homepage cards (brief §4.4).
// Every string below is verbatim from source/pages/<slug>.md, with only the brief's declared fixes:
//  - ceiling-fan: leftover "Certainly, here are…" AI line removed
//  - lighting-additions: live block A body is ceiling-fan copy → not reproduced; its heading is merged into block B as the eyebrow
//  - recessed-lighting: "Reccessed" → "Recessed"; FAQ 1 answer is the brief's price-stripped text (never refill from source)
//  - generator: live FAQs are the ceiling-fan FAQs → omitted
//  - ev-charger: truncated block-B opening fragment kept verbatim (supports the "Recommended By Top Brands" eyebrow)
//  - permanent-outdoor-lighting: "Colonial Electrics" → "Colonial Electric"; feature-grid fixes per brief §5
// Body blocks: string = paragraph · {list:[{term,text} | string]} = list.
// Hero media: each service's hero shows the service itself: a real Colonial job photo (photos/services/<slug>.jpg ->
//   images.json 'services/<slug>'), or, until one exists, a typographic service sheet built from this file's verbatim copy.
//   Per-service hero photo fields: heroAlt (what the photo shows; never a customer name or address) · heroFocus (CSS
//   object-position for the square crop below 960px, e.g. "50% 40%").
// Owner: tpl-service (src/pages/service.mjs renders these).
export const services = [
  {
    slug: "permanent-outdoor-lighting",
    heroAlt: "LED step lights set into the risers of a white deck stair, a Colonial Electric job",
    heroFocus: "50% 60%",
    nav: "Permanent Outdoor Lighting",
    title: "Permanent Outdoor Lighting",
    h1: "Permanent Outdoor Lighting",
    heroLine: "Advanced LED Lighting Control for Outdoor Spaces",
    icon: "sparkle",
    outdoor: true
  },
  {
    slug: "electrical-outlets",
    nav: "Electrical Outlets",
    title: "Electrical Outlets",
    h1: "Electrical Outlets",
    heroLine: "Residential & Commercial Electrical Outlet Installation & Repair in Weymouth",
    icon: "outlet",
    a: {
      h2: "Importance of Professional Electrical Outlet Installation & Repair",
      body: [
        "Electrical outlets are essential components of any home or building, providing power for various appliances and devices. While it may be tempting to attempt DIY outlet installation or repair, the importance of hiring a professional electrician like Colonial Electric cannot be overstated.",
        "Dangers of DIY Electrical Work:",
        {
          list: [
            {
              term: "Electrical Hazards",
              text: "DIY electrical work poses significant risks, including electric shock, fires, and even fatalities. Mishandling electrical wiring or components can lead to serious injuries or damage to property."
            },
            {
              term: "Code Violations",
              text: "Improperly installed outlets can result in code violations and compromise the safety and integrity of the electrical system. Professional electricians are well-versed in local building codes and regulations, ensuring that all installations meet safety standards."
            },
            {
              term: "Voided Warranties",
              text: "DIY electrical work may void warranties on appliances or electrical components. Manufacturers often require professional installation to maintain warranty coverage and ensure the proper functioning of the equipment."
            }
          ]
        },
        "When it comes to electrical outlet installation and repair, the importance of hiring a professional electrician cannot be overstated. Avoid the risks and pitfalls of DIY electrical work by entrusting your electrical needs to the experts at Colonial Electric."
      ]
    },
    b: {
      h2: "Colonial Electric – The Trusted Provider For Electrical Outlet Services",
      body: [
        "Have you ever experienced trying to plug an appliance and out of nowhere, your outlet isn’t working properly? Or perhaps you hear it producing a weird sound? These are just some of the electrical outlet problems that many homeowners experience.",
        "Colonial Electric has handled all types of electrical outlet problems, from minor glitches to complex issues. As the trusted provider for electrical outlet services, we understand the inconvenience and potential dangers associated with malfunctioning outlets.",
        "Our team of skilled electricians at Colonial Electric is well-equipped to address a myriad of electrical outlet issues, ensuring that your home remains safe and functional. Let us take the hassle out of electrical outlet problems and restore peace of mind to your home."
      ]
    },
    faqs: [
      {
        q: "Why is it important to repair or replace malfunctioning electrical outlets?",
        a: [
          "Electrical outlets play a critical role in providing power to various appliances and devices in your home. Malfunctioning outlets pose significant safety risks, including the potential for electric shocks, electrical fires, and damage to appliances.",
          "Repairing or replacing faulty outlets ensures the safety and functionality of your electrical system, reducing the risk of accidents and protecting your home and family."
        ]
      },
      {
        q: "How do I know if my electrical outlet needs repair or replacement?",
        a: [
          "There are several signs that indicate your electrical outlet may need repair or replacement:",
          {
            list: [
              {
                term: "Sparks or burning smells",
                text: "If you notice sparks when plugging in or unplugging devices, or if you detect burning smells near the outlet, it’s a clear sign of a problem."
              },
              {
                term: "Loose or damaged outlets",
                text: "Outlets that are loose, cracked, or damaged pose safety hazards and should be repaired or replaced promptly."
              },
              {
                term: "Intermittent power supply",
                text: "If your outlet provides intermittent power or fails to hold plugs securely, it may indicate underlying wiring issues that need attention."
              },
              {
                term: "Age of the outlet",
                text: "Older outlets may not meet current safety standards and should be upgraded to newer, safer models."
              }
            ]
          }
        ]
      },
      {
        q: "Can I attempt to repair or replace the electrical outlets myself?",
        a: [
          "While it may be tempting to tackle electrical outlet repair or replacement as a DIY project, it’s highly recommended to hire our skilled team. Electrical work requires specialized knowledge, skills, and tools to ensure safety and compliance with building codes.",
          "Attempting DIY electrical work can pose serious risks, including electric shock, fires, and damage to property. Hiring a professional ensures that the job is done safely, accurately, and up to code."
        ]
      },
      {
        q: "What can I expect during the electrical outlet repair or installation process?",
        a: [
          "When you hire Colonial Electric for electrical outlet repair or installation, you can expect the following:",
          {
            list: [
              {
                term: "Assessment",
                text: "Our skilled electricians will assess the condition of your existing outlets and identify any issues or concerns."
              },
              {
                term: "Recommendations",
                text: "Based on our assessment, we’ll provide recommendations for repair or replacement options that best meet your needs and budget."
              },
              {
                term: "Professional installation",
                text: "Our team will handle the installation or repair process with precision and care, ensuring that all work is done safely, efficiently, and up to code."
              },
              {
                term: "Testing and inspection",
                text: "Once the work is completed, we’ll test the outlets to ensure they’re functioning properly and conduct a final inspection to verify compliance with safety standards."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "electrical-panel-upgrade",
    nav: "Electrical Panel Upgrade",
    title: "Electrical Panel Upgrade",
    h1: "Electrical Panel Upgrade",
    heroLine: "Residential & Commercial Electrical Panel Upgrade in Weymouth",
    icon: "panel",
    heroAlt: "New main breaker enclosure between two breaker panels on a diamond-plate backboard, installed by Colonial Electric",
    heroFocus: "50% 45%",
    a: {
      h2: "Is It Worth Upgrading Electrical Panel?",
      body: [
        "Your home’s electrical panel is one of the most important components of your electrical system. It’s what distributes electricity throughout your home, ensuring that all your appliances, lights, and gadgets receive the power they need to function. However, like any other part of your home, electrical panels can become outdated and may need upgrading over time.",
        "Here are the reasons why one should upgrade their electrical panel:",
        {
          list: [
            {
              term: "Increased Demand",
              text: "Modern homes tend to have more electrical devices and appliances than older ones. If you find that your current electrical panel is struggling to keep up with the demand, it might be time for an upgrade."
            },
            {
              term: "Safety Concerns",
              text: "Older electrical panels may not meet current safety standards and could pose a fire hazard. Upgrading to a newer panel with advanced safety features can give you peace of mind and protect your home and family."
            },
            {
              term: "Home Renovations",
              text: "If you’re planning to renovate or add onto your home, you may need to upgrade your electrical panel to accommodate the increased electrical load. This is especially true if you’re adding new rooms, appliances, or electrical circuits."
            },
            {
              term: "Code Compliance",
              text: "Building codes and electrical standards are constantly evolving. If your electrical panel is outdated, it may not comply with current building codes. Upgrading your panel can bring your home up to code and prevent potential issues during inspections or when selling your home."
            }
          ]
        }
      ]
    },
    b: {
      h2: "Electrical Panel Upgrade Made Easier For You",
      body: [
        "At Colonial Electric, we understand that upgrading your electrical panel is a significant decision for your home’s safety and functionality. Our process is designed to make the upgrade as seamless and stress-free as possible for you.",
        {
          list: [
            {
              term: "Initial Consultation",
              text: "We start by scheduling an initial consultation with one of our experienced electricians. During this meeting, we assess your current electrical panel, discuss your energy needs, and address any concerns or questions you may have."
            },
            {
              term: "Customized Solution",
              text: "Based on our assessment and your requirements, we develop a customized solution tailored to your home’s unique needs."
            },
            {
              term: "Transparent Pricing",
              text: "We believe in transparent pricing and will provide you with a detailed quote outlining the cost of the upgrade upfront. There are no hidden fees or surprises, so you can feel confident knowing exactly what to expect."
            },
            {
              term: "Scheduling and Planning",
              text: "Once all is set, we work with you to schedule the upgrade at a time that is convenient for you."
            },
            {
              term: "Professional Installation",
              text: "Our team of licensed electricians will handle the installation with precision and expertise. We use high-quality materials and adhere to strict safety standards."
            },
            {
              term: "Testing and Inspection",
              text: "After the installation is complete, we conduct thorough testing and inspection to ensure that your new electrical panel is functioning optimally."
            }
          ]
        },
        "Upgrade your electrical panel with confidence with Colonial Electric. We make the process easy and hassle-free, so you can enjoy peace of mind knowing that your home’s electrical system is safe, reliable, and up to date."
      ]
    },
    faqs: [
      {
        q: "What is involved in an electrical panel upgrade?",
        a: [
          "An electrical panel upgrade is a comprehensive process that involves several key steps to enhance the functionality and safety of your home’s electrical system. Here’s an overview:",
          {
            list: [
              {
                term: "Assessment and Planning",
                text: "The first step in an electrical panel upgrade is a thorough assessment of your current electrical system. Our licensed electrician will inspect your panel to determine its condition, capacity, and any potential issues or deficiencies."
              },
              {
                term: "Selection of New Panel",
                text: "Once the assessment is complete, we will help you select a new electrical panel that meets your home’s requirements. The new panel will likely have a higher amperage rating to accommodate increased electrical demands and may include advanced safety features such as circuit breakers with arc-fault protection and ground-fault circuit interrupters (GFCIs)."
              },
              {
                term: "Panel Installation",
                text: "With the new panel selected, our electrician will proceed with the installation process. This involves removing the old panel and installing the new one in its place. Panel installation requires precise wiring and connections to ensure proper functionality and compliance with electrical codes and regulations."
              },
              {
                term: "Upgrading Wiring and Components",
                text: "In addition to replacing the panel itself, we may need to upgrade wiring and components within your home’s electrical system. This could include replacing outdated or faulty wiring, installing new circuits to distribute electricity more efficiently, and upgrading outlets and switches to meet modern standards."
              },
              {
                term: "Testing and Inspection",
                text: "Once the installation is complete, our team will conduct thorough testing to ensure that the new panel and electrical system are functioning correctly."
              }
            ]
          }
        ]
      },
      {
        q: "Do you need an electrician to upgrade electrical panel?",
        a: [
          "Yes, it’s strongly advised to enlist the expertise of a licensed electrician from Colonial Electric for electrical panel upgrades. Our electricians possess the necessary skills and knowledge to handle electrical work safely and effectively.",
          "We ensure that the upgrade is performed correctly and complies with all relevant electrical codes and regulations, providing you with peace of mind and a reliable electrical system."
        ]
      },
      {
        q: "How long do electrical panels last?",
        a: [
          "Electrical panels can last for 20-30 years with proper maintenance. However, factors such as the quality of the panel, the electrical load placed on it, and environmental conditions can affect its lifespan. It’s a good idea to have your panel inspected regularly by a professional to assess its condition."
        ]
      },
      {
        q: "Should I replace or upgrade my panel?",
        a: [
          "Whether you should replace or upgrade your panel depends on various factors such as the age of your current panel, its condition, and your electrical needs. If your panel is outdated, experiencing frequent issues, or unable to meet your electrical demands, an upgrade may be necessary. Consulting with our team can help you determine the best course of action for your specific situation."
        ]
      }
    ]
  },
  {
    slug: "surge-protection",
    nav: "Surge Protection",
    title: "Surge Protection",
    h1: "Surge Protection",
    heroLine: "Residential & Commercial Surge Protection in Weymouth",
    icon: "surge",
    heroAlt: "Plug-in surge protective device in a Siemens breaker panel, installed by Colonial Electric",
    heroFocus: "50% 40%",
    a: {
      h2: "What is Surge Protection & How Does It Work?",
      body: [
        "Surge protection is vital for safeguarding modern homes and businesses against sudden voltage spikes that can damage sensitive electronic devices. Surge protection devices (SPDs) are crucial in preventing potential harm to appliances, equipment, and electronics.",
        "Surges can arise from various sources, including lightning strikes, power grid fluctuations, or internal electrical issues, posing a significant risk to electronics by surpassing their voltage tolerance levels.",
        "Surge protection devices are designed to divert excess voltage away from sensitive equipment and electrical systems. The most common type of surge protection device is the surge protector power strip, typically used for small electronics and appliances.",
        "For larger systems, such as those installed by electricians like Colonial Electric, more comprehensive surge protection methods are employed. These methods often involve installing whole-house surge protectors at the electrical panel or point of entry for electrical service."
      ]
    },
    b: {
      h2: "Protect Your Home With Colonial Electric",
      body: [
        "We genuinely care for the welfare of our customers, and we value the safety and security of your home. At Colonial Electric, our expert electricians are committed to providing top-notch surge protection solutions to safeguard your property and electronic devices against potential damage from voltage spikes and surges.",
        "With years of experience and expertise, our team understands the importance of reliable surge protection in modern households. We go beyond mere installation, offering tailored solutions that suit your specific needs and budget, ensuring comprehensive protection for your home’s electrical systems.",
        "From whole-house surge protectors to point-of-use surge protection for sensitive equipment, you can count on us to implement a multi-layered defense strategy against electrical surges."
      ]
    },
    faqs: [
      {
        q: "Is surge protection necessary?",
        a: [
          "Yes, surge protection is necessary to safeguard electronic devices and electrical systems from potentially damaging voltage spikes or surges. Surges can occur due to various factors such as lightning strikes, power grid fluctuations, or internal electrical issues.",
          "Without surge protection, these surges can exceed the voltage tolerance levels of appliances and electronics, leading to irreparable damage. Surge protection devices (SPDs) act as barriers, diverting excess voltage away from sensitive equipment and ensuring the safety and longevity of electrical systems."
        ]
      },
      {
        q: "What devices should be surge protected?",
        a: [
          "Ideally, any electronic device or appliance that is susceptible to damage from voltage surges should be surge protected. This includes but is not limited to computers, laptops, TVs, gaming consoles, audio equipment, networking devices, printers, and home entertainment systems.",
          "Additionally, sensitive equipment such as medical devices, security systems, and smart home devices can benefit from surge protection to prevent malfunctions or data loss."
        ]
      },
      {
        q: "Do refrigerators need a surge protector?",
        a: [
          "While refrigerators are not as sensitive to voltage fluctuations as electronic devices like computers or TVs, they can still benefit from surge protection. Refrigerators contain sensitive electronic components such as control boards and compressors that can be damaged by power surges.",
          "Since refrigerators are essential household appliances, protecting them with a surge protector can prevent costly repairs or replacement due to surge-related damage."
        ]
      },
      {
        q: "What happens if you don’t use a surge protector?",
        a: [
          "Without using a surge protector, electronic devices and appliances are vulnerable to the adverse effects of voltage spikes.",
          "When a surge occurs, it can overwhelm the electrical system and exceed the device’s voltage tolerance levels. This can lead to immediate damage, rendering the device inoperable, or it can cause gradual degradation over time, shortening the lifespan of the equipment.",
          "In severe cases, a power surge can even pose safety hazards such as electrical fires. Therefore, not using a surge protector increases the risk of financial loss, inconvenience, and potential safety hazards associated with damaged electronics and electrical systems."
        ]
      }
    ]
  },
  {
    slug: "ceiling-fan-installation",
    heroAlt: "Ceiling fan with a light kit and recessed lights in a freshly painted living room, installed by Colonial Electric",
    heroFocus: "50% 62%",
    nav: "Ceiling Fan Installation",
    title: "Ceiling Fan Installation",
    h1: "Ceiling Fan Installation",
    heroLine: "Residential & Commercial Ceiling Fan Installation in Weymouth",
    icon: "fan",
    a: {
      h2: "Dangers of DIY Ceiling Fan Installation",
      body: [
        "Many people tend to underestimate the risks associated with DIY ceiling fan installation. While it might seem like you’re saving money by doing it yourself, the potential hazards involved could end up costing you more in the long run.",
        {
          list: [
            {
              term: "Improper Mounting",
              text: "Without proper tools and knowledge, ceiling fans may be incorrectly anchored to the ceiling, leading to instability and potential collapse."
            },
            {
              term: "Incorrect Electrical Connections",
              text: "DIY installers may make mistakes in wiring connections, leading to electrical shorts, sparks, or even electrical fires."
            },
            {
              term: "Unbalanced Fans",
              text: "Failure to balance the fan properly can result in noisy operation, premature wear on motor components, and dangerous vibrations."
            },
            {
              term: "Inadequate Clearance",
              text: "Insufficient space between fan blades and nearby objects can cause damage to furniture or personal injury if someone comes into contact with the spinning blades."
            },
            {
              term: "Lack of Knowledge of Building Codes",
              text: "DIY enthusiasts may not be aware of local building codes and regulations governing ceiling fan installation, risking fines, invalidated insurance coverage, or forced removal of the fan."
            }
          ]
        },
        "With this in mind, hiring a professional is the best way to go."
      ]
    },
    b: {
      h2: "Colonial Electric – Making Ceiling Fan Installation Safer and Smarter",
      body: [
        "One of the fortes of Colonial Electric is our commitment to ensuring the safety and efficiency of your electrical installations. When it comes to ceiling fan installation, our team brings a wealth of expertise and experience to the table. From the initial assessment to the final touches, Colonial Electric provides comprehensive services to make your ceiling fan installation a breeze.",
        "Our process begins with a detailed evaluation of your space, taking into account factors such as ceiling height, room dimensions, and existing electrical setup to determine the optimal placement and type of ceiling fan. This assessment serves as the foundation for our installation approach.",
        "Then, our experienced electricians carefully plan the installation procedure, meticulously mapping out wiring layouts and mounting positions to guarantee a safe and effective installation. We adhere to industry-leading techniques, armed with state-of-the-art tools to address any potential challenges.",
        "At Colonial Electric, we prioritize efficiency and accuracy, aiming to complete installations promptly while upholding the highest standards of quality."
      ]
    },
    faqs: [
      {
        q: "Can I install a ceiling fan myself?",
        a: [
          "While it’s possible to install a ceiling fan yourself if you have experience with electrical work and the necessary tools, it’s generally recommended to hire a professional electrician. Proper installation ensures safety and efficiency, and electricians are trained to handle wiring and mounting securely. If you’re unsure about your ability to install a ceiling fan safely, it’s best to seek professional assistance to avoid potential hazards."
        ]
      },
      {
        q: "How much does it cost to install a ceiling fan?",
        a: [
          "The cost of installing a ceiling fan can vary depending on several factors, including the complexity of the installation, the location, and any additional electrical work required. Contact us today and we can provide you with a personalized quote based on your specific needs and the details of your space. Our experienced electricians will assess the requirements for your ceiling fan installation and offer transparent pricing that accounts for all necessary materials and labor."
        ]
      },
      {
        q: "Are ceiling fans cheaper than AC?",
        a: [
          "In terms of energy consumption, ceiling fans are generally much cheaper to operate than air conditioning units. Ceiling fans circulate air and create a cooling effect through evaporation, requiring significantly less electricity than air conditioners. However, air conditioners can provide more immediate and intense cooling in extremely hot conditions. Ultimately, the choice between a ceiling fan and AC depends on factors such as climate, personal comfort preferences, and energy efficiency goals."
        ]
      },
      {
        q: "Are 3 or 4 blade fans better?",
        a: [
          "The number of blades on a ceiling fan doesn’t necessarily determine its performance or efficiency. Both 3-blade and 4-blade fans can effectively circulate air and cool a room. The efficiency and performance of a ceiling fan depend more on factors such as blade pitch, motor power, and the overall design of the fan. Ultimately, personal preference and aesthetic considerations often play a significant role in choosing between 3-blade and 4-blade fans."
        ]
      }
    ]
  },
  {
    slug: "ev-charger-installation",
    heroAlt: "ChargePoint home EV charger mounted on a cedar post beside a house, installed by Colonial Electric",
    heroFocus: "50% 40%",
    nav: "EV Charger Installation",
    title: "EV Charger Installation",
    h1: "EV Charger Installation",
    heroLine: "Residential & Commercial EV Charger Installation in Weymouth",
    icon: "ev",
    a: {
      h2: "EV Chargers – And Why You Should Install One",
      body: [
        "Electrical Vehicles have slowly taken the world by storm. With their zero emissions and eco-friendly features. Installing an EV charger at your home or business offers unmatched convenience, allowing you to charge your vehicle overnight or during the day without frequent trips to public stations.",
        "Beyond convenience, it boosts property value and demonstrates environmental commitment, making your property more attractive to buyers and aligning with sustainability goals. With potential cost savings from cheaper home charging and available incentives, installing an EV charger is a smart investment that prepares you for a cleaner, more efficient future.",
        "A professional, such as Colonial Electric is equipped with equipment and trained technicians to ensure that your EV charger installation is completed to the highest standards of safety and reliability. With Colonial Electric, you can trust that your charging infrastructure will be installed seamlessly, providing you with peace of mind and hassle-free electric vehicle charging for years to come."
      ]
    },
    b: {
      eyebrow: "Recommended By Top Brands",
      h2: "Your Trusted EV Charger Installer",
      body: [
        "EV chargers across residential and commercial properties, earning a reputation as a trusted installer recommended by top brands in the electric vehicle industry. Our team brings years of experience and expertise to every installation, ensuring that your EV charger is installed efficiently and effectively.",
        "We work closely with leading EV charger manufacturers to stay updated on the latest technology and installation techniques, guaranteeing that your charging solution meets the highest standards of quality and performance. Whether you’re a homeowner looking to upgrade your property or a business seeking to provide charging options for employees and customers, Colonial Electric is your partner for reliable EV charging solutions.",
        "With our commitment to customer satisfaction and dedication to excellence, you can trust Colonial Electric to deliver superior service and support throughout the installation process and beyond. Join countless satisfied customers who have made the switch to electric vehicles with Colonial Electric as their trusted partner."
      ]
    },
    faqs: [
      {
        q: "Should I add an EV charger to my home?",
        a: [
          "Adding an EV charger to your home can be highly beneficial, offering convenience, potential cost savings, and increasing property value. If you own an electric vehicle or plan to purchase one in the future, installing a home EV charger provides the convenience of charging at your own pace and can eliminate the need for frequent trips to public charging stations."
        ]
      },
      {
        q: "Do you need an electrician to charge an EV?",
        a: [
          "While you don’t need an electrician to physically charge your EV, you do need one to install an EV charging station at your home or business. EV charger installations involve electrical wiring and safety considerations, so it’s crucial to hire a qualified electrician to ensure proper installation and compliance with local building codes and regulations."
        ]
      },
      {
        q: "What is a standard EV charger installation?",
        a: [
          "A standard EV charger installation typically involves mounting the charging unit on a wall or post, connecting it to your electrical panel, and configuring any necessary electrical wiring and conduit. The installation may also require obtaining necessary permits and inspections from local authorities. The specifics of the installation process can vary depending on factors such as the type of charger, location, and existing electrical infrastructure."
        ]
      },
      {
        q: "How long does EV charger installation take?",
        a: [
          "The duration of EV charger installation depends on various factors, including the complexity of the installation, the type of charger being installed, and the availability of electrical infrastructure. In general, a standard EV charger installation can take anywhere from 2-3 hours.",
          "However, more complex installations or situations that require upgrades to existing electrical systems may take longer. It’s advisable to consult with a qualified electrician to assess your specific installation needs and timeline"
        ]
      }
    ]
  },
  {
    slug: "whole-house-wiring-or-rewiring",
    heroAlt: "New cable runs dropped into a breaker panel on a diamond-plate backboard, a Colonial Electric job",
    heroFocus: "50% 30%",
    nav: "Whole House Wiring or Rewiring",
    title: "Whole House Wiring or Rewiring",
    h1: "Whole House Wiring/Rewiring",
    heroLine: "Whole House Wiring/Rewiring in Weymouth",
    icon: "wiring",
    a: {
      h2: "The Need For Whole House Wiring/Rewiring",
      body: [
        "As per the National Fire Prevention Association, defective electrical wiring stands as the primary culprit behind residential fires. Though not the most glamorous project, rewiring your house might just be the most crucial safety measure you can undertake.",
        {
          list: [
            "Inability to utilize three-prong outlets throughout your home, resorting to only two-prong outlets.",
            "Consistent tripping or blowing of breakers whenever you operate appliances like blenders.",
            "Experiencing a tingling sensation or mild electric shock when plugging or touching certain appliances.",
            "Persistently detecting an odor akin to burning in a specific room or around certain appliances, distinct from pleasant scents like incense."
          ]
        },
        "Don’t risk the safety of your home and loved ones by ignoring these warning signs. Contact Colonial Electric now and experience the peace of mind that comes with professional whole-house rewiring services."
      ]
    },
    b: {
      h2: "Premium Whole House Wiring & Rewiring at Your Fingertips",
      body: [
        "Have you ever experienced the inconvenience of frequent power outages, flickering lights, or outdated outlets in your home? At Colonial Electric, we understand the unique challenges posed by antiquated electrical systems. That’s why we offer premium whole house wiring and rewiring services tailored to meet your specific needs.",
        "With years of experience serving homeowners like you, we take pride in delivering exceptional results that prioritize safety, efficiency, and reliability. Our team of skilled electricians is trained to handle the complexities of home wiring, ensuring that your home’s electrical system meets modern standards without compromising its historical integrity.",
        "But our commitment to your safety doesn’t stop there. We also offer comprehensive electrical inspections to identify potential hazards and assess the overall condition of your home’s wiring. From faulty connections to outdated components, our thorough inspections leave no stone unturned, giving you peace of mind knowing that your home is in good hands."
      ]
    },
    faqs: [
      {
        q: "What constitutes hazardous wiring?",
        a: [
          "Outdated wiring types not only fail to meet contemporary codes but also pose significant safety risks. These antiquated systems lack grounding in their outlets, thereby increasing the likelihood of electric shocks and power surges.",
          {
            list: [
              {
                term: "Aluminum Wiring",
                text: "During a span of approximately seven years, aluminum wiring was prevalent in home construction. However, its susceptibility to expansion and contraction under varying temperatures went unnoticed until it caused issues for numerous homeowners. Homes equipped with aluminum wiring are 55% more prone to experiencing residential fires."
              },
              {
                term: "Knob & Tube Wiring",
                text: "A century ago, knob and tube wiring was the norm in residential construction. Utilizing porcelain connectors, this wiring method lacks grounding and is incompatible with modern electronic devices, as many historic homeowners can attest."
              }
            ]
          }
        ]
      },
      {
        q: "What is structured wiring?",
        a: [
          "For homeowners considering the rewiring of their residences, incorporating advancements in technology, such as structured cabling, may be advantageous. Structured cables encompass robust electrical and data cables designed to convey power, telephone, internet, lighting, and heating signals throughout various rooms in the home. Notably, structured electrical wiring has been shown to augment the overall value of residential properties."
        ]
      },
      {
        q: "What is included in a full rewire?",
        a: [
          "A complete home rewiring project involves the removal and replacement of all existing wiring to address safety concerns and eliminate potential hazards. Beyond the wiring overhaul, the process also encompasses the repair and installation of sockets, encompassing those required for heat detectors, cooker points, and lighting fixtures.",
          "Moreover, a thorough rewiring endeavor involves a detailed assessment of the electrical system, ensuring compliance with modern safety standards and regulations. It may also involve upgrading electrical panels and fuse boxes to accommodate increased power demands and enhance overall system efficiency."
        ]
      },
      {
        q: "How long does whole house rewiring take?",
        a: [
          "The duration of a full house rewire can vary depending on factors such as the size of the property, the complexity of the existing wiring, and any additional electrical work required. Generally, a full house rewire may take anywhere from 5 to 10 days to complete, but this timeline is not fixed and may differ based on specific circumstances.",
          "For a more accurate estimation and assessment of your particular situation, it is advisable to contact us directly. Our team of professionals can provide a detailed explanation of the process involved and offer a personalized assessment tailored to your home’s needs."
        ]
      }
    ]
  },
  {
    slug: "electrical-inspections",
    nav: "Electrical Inspections",
    title: "Electrical Inspections",
    h1: "Electrical Inspection",
    heroLine: "Residential & Commercial Electrical Inspection in Weymouth",
    icon: "inspect",
    a: {
      h2: "What Is an Electrical Home Inspection?",
      body: [
        "When conducting an electrical home inspection, we undertake a comprehensive evaluation of your entire electrical system to ensure that all wiring, systems, and components comply with legal safety standards, with the National Electrical Code (NEC) serving as our principal guideline.",
        "There are compelling reasons why scheduling a home electrical inspection is essential. Beyond safeguarding the integrity of your home and the well-being of its occupants, engaging a professional to assess your electrical system offers invaluable peace of mind.",
        "After the assessment of your electrical home inspection, our team will give you a meticulously detailed, prioritized checklist. This document outlines areas requiring immediate attention, offers recommendations for enhancements, and presents potential upgrade opportunities to optimize your electrical infrastructure."
      ]
    },
    b: {
      h2: "Comprehensive Electrical Inspection to Ensure Building Safety & Compliance",
      body: [
        "Whether it’s for your business or home, ensuring that all electrical systems meet safety standards and compliance regulations is paramount. At Colonial Electric, we specialize in providing comprehensive electrical inspections tailored to both commercial and residential properties.",
        "Our team of certified electricians conducts thorough examinations of electrical systems, wiring, and components to guarantee adherence to established safety protocols and regulatory requirements. Using industry best practices and standards, we leave no stone unturned in our quest to ensure the safety and compliance of your building’s electrical infrastructure.",
        "Don’t leave the safety of your building to chance. Schedule a comprehensive electrical inspection with Colonial Electric today and take proactive steps towards a safer, more compliant environment for everyone."
      ]
    },
    faqs: [
      {
        q: "What are the different categories of electrical testing?",
        a: [
          "There are several key types of electrical installation tests, each serving a specific purpose in assessing the integrity and safety of electrical systems. Among the most common tests are, continuity testing, insulation resistance testing, and ground fault circuit interruption (GFCI) testing. Additionally, functional testing evaluates whether electrical devices or systems perform their designated functions accurately and efficiently."
        ]
      },
      {
        q: "What standards govern electrical safety testing?",
        a: [
          "The National Fire Protection Association (NFPA) oversees standards related to electrical safety testing, with particular relevance to various industries and settings. For instance, NFPA 99 Standard for Health Care Facilities delineates the necessary electrical safety testing protocols within healthcare institutions.",
          "Additionally, publications such as NFPA 70, known as the National Electrical Code, and NFPA 70E, focusing on Electrical Safety in the Workplace, provide essential guidelines and regulations for ensuring electrical safety across different environments and sectors."
        ]
      },
      {
        q: "What is the difference between inspection and testing in electrical?",
        a: [
          "Inspection focuses on visual assessment and verification of installation quality and compliance, while testing involves measurements and evaluations of electrical parameters and performance.",
          "Inspection primarily identifies visible defects and non-compliance issues, whereas testing validates electrical functionality, safety features, and compliance with technical specifications.",
          "Both inspection and testing are essential components of electrical maintenance, safety assurance, and compliance efforts, contributing to the overall reliability and safety of electrical systems and installations."
        ]
      },
      {
        q: "Why do we need electrical safety testing?",
        a: [
          "Electrical safety testing is crucial for several reasons:",
          {
            list: [
              {
                term: "Prevention of Electrical Hazards",
                text: "Electrical safety testing helps identify potential hazards such as short circuits, faulty wiring, or insulation breakdowns that could lead to electrical shocks, fires, or equipment damage."
              },
              {
                term: "Compliance with Regulations",
                text: "Many countries and regions have specific regulations and standards that mandate electrical safety testing for various types of equipment and installations. Compliance ensures that electrical systems and devices meet the required safety standards, reducing the risk of accidents and legal liabilities."
              },
              {
                term: "Protection of Personnel and Property",
                text: "Proper electrical safety testing ensures the protection of personnel working with or around electrical equipment and installations. It also safeguards property from damage caused by electrical faults or failures."
              },
              {
                term: "Maintaining Reliability",
                text: "Regular electrical safety testing helps maintain the reliability and performance of electrical systems and equipment by identifying potential issues early on. This proactive approach minimizes downtime and costly repairs while maximizing operational efficiency."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "recessed-lighting",
    nav: "Recessed Lighting",
    title: "Recessed Lighting",
    h1: "Recessed Lighting",
    heroLine: "Residential & Commercial Recessed Lighting in Weymouth",
    icon: "recessed",
    heroAlt: "Recessed ceiling lights evenly spaced across a remodeled kitchen, a Colonial Electric job",
    heroFocus: "50% 0%",
    a: {
      h2: "What Is Recessed Lighting & Why Should I Have One?",
      body: [
        "Recessed lighting, often referred to as can lights or downlights, is a popular lighting option that provides a sleek and modern look to any space. Unlike traditional lighting fixtures that hang from the ceiling, recessed lighting is installed flush with the ceiling, offering a seamless and unobtrusive appearance. Its versatility and functionality make it a preferred choice for many homeowners and designers alike.",
        "Recessed lighting consists of a housing that is installed above the ceiling, with a trim piece that sits flush against the ceiling surface. The bulb, or light source, is housed within the fixture, directing light downward into the room.",
        "Benefits of Recessed Lighting:",
        {
          list: [
            {
              term: "Space-Saving Design",
              text: "Recessed lighting takes up minimal space since the fixtures are installed flush with the ceiling, making it an ideal choice for rooms with low ceilings or limited space."
            },
            {
              term: "Versatility",
              text: "Recessed lighting fixtures come in various sizes, shapes, and designs, allowing for flexibility in design and placement. They can be installed in almost any room of the house."
            },
            {
              term: "Enhanced Ambiance",
              text: "Recessed lighting provides a soft and diffused light that can enhance the ambiance of any room. It can be used to create different moods or highlight specific architectural features or artwork within a space."
            },
            {
              term: "Energy Efficiency",
              text: "Many recessed lighting fixtures are designed to accommodate energy-efficient LED bulbs, which consume less energy and last longer than traditional incandescent bulbs. This can result in lower energy bills and reduced maintenance costs over time."
            }
          ]
        }
      ]
    },
    b: {
      h2: "Trust the Experts For Recessed Lighting Installation",
      body: [
        "When it comes to lighting installation, regardless of the project size, you want someone you can trust to get the job done right. At Colonial Electric, we pride ourselves on being the experts in recessed lighting installation. With years of experience and a team of highly skilled electricians, we are committed to providing top-quality service and exceeding our customers’ expectations.",
        "Our professionals understand the intricacies of recessed lighting installation, from selecting the appropriate fixtures and bulbs to ensuring proper placement and wiring. We work closely with our clients to assess their needs, preferences, and budget, offering tailored solutions that enhance the beauty and functionality of their homes or businesses.",
        "With Colonial Electric, you can trust that your recessed lighting installation will be completed efficiently, safely, and to the highest standards of quality."
      ]
    },
    faqs: [
      {
        q: "How much should I expect to pay for recessed lighting?",
        a: [
          "The cost of recessed lighting can vary depending on several factors, including the type and quality of fixtures, the complexity of the installation, and any additional features or customization. It’s advisable to consult with our professional electrician to get a more accurate estimate tailored to your individual needs and budget."
        ]
      },
      {
        q: "What is the purpose of recessed lighting?",
        a: [
          "Recessed lighting serves several purposes in residential and commercial spaces. One of its primary purposes is to provide functional and aesthetic illumination without taking up valuable space.",
          "By installing recessed fixtures flush with the ceiling, walls, or floors, it creates a seamless and unobtrusive lighting solution that enhances the overall ambiance of the room. Additionally, recessed lighting can be strategically placed to highlight architectural features, artwork, or specific areas within a space, adding depth and visual interest."
        ]
      },
      {
        q: "Is recessed lighting efficient?",
        a: [
          "Recessed lighting can be highly efficient, especially when paired with energy-efficient LED bulbs. LED technology consumes significantly less energy than traditional incandescent or fluorescent bulbs, resulting in lower electricity bills and reduced environmental impact.",
          "Additionally, LED bulbs have a longer lifespan, which reduces the frequency of replacement and maintenance costs. By choosing LED recessed lighting fixtures, homeowners can enjoy both energy savings and long-term reliability, making it a cost-effective and eco-friendly lighting solution."
        ]
      },
      {
        q: "What are the benefits of LED recessed lighting?",
        a: [
          "LED recessed lighting offers several benefits compared to traditional lighting technologies, such as:",
          {
            list: [
              {
                term: "Energy Efficiency",
                text: "LED bulbs consume up to 80% less energy than incandescent bulbs, leading to lower electricity bills and reduced environmental impact."
              },
              {
                term: "Long Lifespan",
                text: "LED bulbs typically last 10-20 times longer than incandescent bulbs, reducing the frequency of replacements and maintenance."
              },
              {
                term: "Minimal Heat Output",
                text: "LED recessed lighting produces minimal heat, making it safer and more comfortable to use in enclosed spaces."
              },
              {
                term: "Versatility",
                text: "LED bulbs are available in various color temperatures and can be dimmable, allowing for flexible customization of ambiance and mood."
              },
              {
                term: "Superior Performance",
                text: "LED recessed lighting offers high-quality illumination with consistent brightness and color rendering, enhancing the overall aesthetic appeal of any space."
              },
              {
                term: "Reduced UV Emissions",
                text: "LED bulbs emit minimal UV radiation, making them suitable for illuminating sensitive materials or artwork without causing damage over time."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "remodels",
    nav: "Remodels",
    title: "Remodels",
    h1: "Remodels",
    heroLine: "Residential & Commercial Remodels in Weymouth",
    icon: "remodel",
    heroAlt: "Remodeled kitchen with recessed ceiling lights over white shaker cabinets and a lit quartz backsplash, a Colonial Electric job",
    heroFocus: "50% 15%",
    a: {
      h2: "Electrical Remodels & What It Involves",
      body: [
        "When it comes to electrical remodels, there are several key components and considerations to keep in mind. First and foremost, it’s essential to assess the current state of your electrical system and determine what upgrades or changes are necessary to meet your needs and comply with building codes.",
        "Electrical remodels often involve tasks such as:",
        {
          list: [
            {
              term: "Rewiring",
              text: "In older homes or buildings, outdated wiring systems may pose safety hazards and limit the capacity for modern electrical demands. Rewiring involves replacing old wiring with newer, safer materials to ensure reliable power distribution throughout the space."
            },
            {
              term: "Adding Outlets and Fixtures",
              text: "As our reliance on electronic devices continues to grow, the need for additional outlets and lighting fixtures becomes increasingly important. Electrical remodels may involve installing new outlets, switches, and light fixtures to accommodate your power needs and enhance the functionality of the space."
            },
            {
              term: "Upgrading Electrical Panels",
              text: "Electrical panels serve as the hub for distributing power throughout your home or business. Upgrading an outdated or inadequate electrical panel can improve safety, prevent electrical overloads, and support the new additional space of your business or home."
            },
            {
              term: "Safety Inspections and Code Compliance",
              text: "During an electrical remodel, it’s crucial to ensure that all work meets local building codes and safety standards. Professional electricians have the expertise to conduct thorough inspections, identify potential hazards, and make necessary corrections to ensure compliance with regulations."
            }
          ]
        }
      ]
    },
    b: {
      h2: "Trust Colonial Electric For Your Electrical Remodeling Needs",
      body: [
        "Our process begins with a comprehensive consultation where we discuss your remodeling goals, electrical needs, and budget constraints. We take the time to understand your vision for the project and provide personalized recommendations.",
        "Once we have a clear understanding of your objectives, our team of skilled electricians develops a detailed plan outlining the scope of work, and timeline. We prioritize transparency and communication throughout the process.",
        "During the implementation phase, our experienced electricians execute the remodel with precision and attention to detail. Whether it’s rewiring existing circuits, installing new fixtures, or upgrading electrical panels, we adhere to the highest standards of quality and safety to ensure exceptional results.",
        "Upon completion of the electrical remodel, we conduct a thorough inspection to verify that all work meets regulatory requirements and exceeds your expectations. We stand behind our craftsmanship and offer warranties on our workmanship to provide you with added peace of mind!"
      ]
    },
    faqs: [
      {
        q: "When is electrical remodeling necessary?",
        a: [
          "Electrical remodeling is necessary under various circumstances, including:",
          {
            list: [
              "Upgrading outdated electrical systems to meet current safety codes and standards.",
              "Renovating or expanding your property, which may require additional electrical circuits or outlets.",
              "Addressing electrical issues such as frequent tripping of circuit breakers, flickering lights, or outdated wiring.",
              "Installing new appliances or fixtures that demand more electrical capacity than your current system can handle."
            ]
          }
        ]
      },
      {
        q: "Can I do DIY electrical remodeling?",
        a: [
          "While DIY electrical work is legal in some jurisdictions for minor tasks like changing outlets or switches, significant electrical remodeling projects should be left to professional electricians. DIY electrical work carries significant risks, including personal injury from working with electricity without proper training and safety precautions.",
          "Improperly installed wiring or electrical components can also spark fires, endangering lives and property. Plus, DIY electrical work may not comply with local building codes and regulations, resulting in fines, failed inspections, and safety hazards.",
          "Some insurance policies may not cover damages caused by DIY electrical work, voiding warranties and leaving you financially liable for repairs. Therefore, it is strongly recommended to hire a licensed and experienced electrician for any significant electrical remodeling projects to ensure safety, compliance, and quality workmanship."
        ]
      },
      {
        q: "Which electrical components should I consider remodeling?",
        a: [
          "Several electrical components may require remodeling, including:",
          {
            list: [
              {
                term: "Electrical panels",
                text: "Upgrading to a higher capacity panel or replacing outdated panels to meet increased electrical demands and safety standards."
              },
              {
                term: "Wiring",
                text: "Rewiring old or faulty wiring to prevent electrical hazards like short circuits, fires, or shocks."
              },
              {
                term: "Outlets and switches",
                text: "Replacing old outlets and switches with newer, safer models that comply with current electrical codes."
              },
              {
                term: "Lighting fixtures",
                text: "Upgrading lighting fixtures for improved efficiency, safety, and aesthetics."
              },
              {
                term: "Surge protection",
                text: "Installing surge protectors to safeguard electronic devices from voltage spikes and surges."
              }
            ]
          }
        ]
      },
      {
        q: "Why should I hire a professional electrician for remodeling?",
        a: [
          "Hiring a professional electrician for remodeling offers several advantages. Firstly, professional electricians have the expertise and training to safely handle electrical work, reducing the risk of accidents, fires, and electrical hazards. They are also well-versed in local building codes and regulations, ensuring that your electrical remodeling project meets legal requirements and safety standards.",
          "Moreover, professional electricians possess the skills and experience to deliver high-quality workmanship, minimizing the likelihood of future electrical problems. Many professional electricians offer warranties on their work, providing you with peace of mind and protection against unexpected issues. Lastly, professional electricians can complete electrical remodeling projects more efficiently, saving you time and effort compared to DIY approaches."
        ]
      }
    ]
  },
  {
    slug: "lighting-additions",
    nav: "Lighting Additions",
    title: "Lighting Additions",
    h1: "Lighting Additions",
    heroLine: "Residential & Commercial Lighting Additions in Weymouth",
    icon: "bulb",
    heroAlt: "Vertical exterior wall lights glowing beside sliding doors on a rear addition at dusk, a Colonial Electric job",
    heroFocus: "50% 40%",
    a: null,
    b: {
      h2: "Colonial Electric – Illuminating Spaces & Elevating Experiences",
      body: [
        "Because of just how impactful having the right lighting is, lighting additions in a home or business has become an essential aspect of modern living and design. At Colonial Electric, we understand the significance of lighting additions in both residential and commercial settings. Our mission is to go beyond mere illumination; we strive to create captivating environments that uplift spirits, inspire creativity, and foster productivity.",
        "In today’s fast-paced world, where every moment counts, having the right lighting can make all the difference. It’s not just about brightening up a room; it’s about infusing it with warmth, character, and personality. Whether you’re looking to enhance the ambiance of your living space or create a welcoming atmosphere in your place of business, our team at Colonial Electric is here to bring your vision to life.",
        "For sustainable, efficient and safe lighting additions, trust Colonial Electric to deliver innovative solutions tailored to your needs."
      ],
      eyebrow: "Lighting & How It Enhances Your Space"
    },
    faqs: [
      {
        q: "How can I add better lighting?",
        a: [
          "Adding better lighting to your space involves several considerations:",
          {
            list: [
              {
                term: "Assess your current lighting",
                text: "Evaluate the existing lighting in your space. Determine if it’s sufficient for your needs, if it creates the right ambiance, and if it enhances the functionality of the area."
              },
              {
                term: "Consider natural light",
                text: "Maximize natural light by keeping windows clean, using light-colored window treatments, and positioning furniture to allow light to penetrate deeper into the room."
              },
              {
                term: "Layer your lighting",
                text: "Incorporate a combination of ambient, task, and accent lighting to create depth and visual interest in your space. This allows you to adjust the lighting according to different activities and moods."
              },
              {
                term: "Choose the right fixtures",
                text: "Select lighting fixtures that complement your decor style while providing adequate illumination. Consider factors such as size, shape, finish, and energy efficiency when choosing fixtures."
              },
              {
                term: "Utilize technology",
                text: "Explore smart lighting options that allow you to control your lights remotely, adjust brightness levels, and create customized lighting scenes to suit various occasions."
              }
            ]
          }
        ]
      },
      {
        q: "How much does it cost to add lighting?",
        a: [
          "The cost of adding lighting to a space can vary widely depending on many factors, including the type and quality of lighting fixtures, the complexity of the installation, and any additional electrical work required. Other factors such as the size of the space, accessibility, and local labor rates can also influence the overall cost.",
          "For a more accurate assessment of the cost involved in adding lighting to your specific space, we recommend contacting us for a personalized consultation. Our team at Colonial Electric can assess your needs, discuss your options, and provide you with a detailed estimate tailored to your requirements and budget. Reach out to us today to get started on illuminating your space with excellence."
        ]
      },
      {
        q: "What are the 3 purposes of lighting?",
        a: [
          {
            list: [
              {
                term: "Functionality",
                text: "Lighting serves the practical purpose of illuminating spaces to enable activities such as reading, cooking, working, and moving safely indoors and outdoors."
              },
              {
                term: "Aesthetics",
                text: "Lighting enhances the visual appeal of a space by highlighting architectural features, artwork, and decor, creating ambiance, and setting the mood."
              },
              {
                term: "Safety and Security",
                text: "Lighting plays a crucial role in enhancing safety and security by illuminating pathways, deterring intruders, and ensuring visibility in potentially hazardous areas."
              }
            ]
          }
        ]
      },
      {
        q: "What are 4 types of lighting?",
        a: [
          {
            list: [
              {
                term: "Ambient Lighting",
                text: "Also known as general lighting, ambient lighting provides overall illumination to a space and establishes its overall brightness. Examples include ceiling-mounted fixtures, recessed lights, and wall sconces."
              },
              {
                term: "Task Lighting",
                text: "Task lighting is focused illumination that helps individuals perform specific activities such as reading, cooking, or working. Examples include desk lamps, under-cabinet lighting in kitchens, and pendant lights over work areas."
              },
              {
                term: "Accent Lighting",
                text: "Accent lighting is used to highlight specific focal points or architectural features in a space, such as artwork, sculptures, or textured walls. Examples include track lighting, wall-mounted spotlights, and picture lights."
              },
              {
                term: "Decorative Lighting",
                text: "Decorative lighting adds style and visual interest to a space while also serving as a focal point or statement piece. Examples include chandeliers, pendant lights, and decorative lamps."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "whole-home-battery-back-up",
    nav: "Whole Home Battery Back Up",
    title: "Whole Home Battery Back Up",
    h1: "Whole Home Battery Back Up",
    heroLine: "Residential & Commercial Whole Home Battery Back Up in Weymouth",
    icon: "battery",
    heroAlt: "Tesla backup gateway and SPAN smart panel installed side by side by Colonial Electric",
    heroFocus: "50% 50%",
    a: {
      h2: "Whole Home Battery VS Generators",
      body: [
        "The key difference between whole home batteries and generators lies in their mode of operation and sustainability. Generators rely on fossil fuels such as methane gas, diesel, or propane to generate electricity during power outages. In contrast, whole home batteries come without the carbon monoxide risk, noise or as much of the fuel cost.",
        "Home batteries store electricity from the grid or renewable sources like solar panels and discharge it when needed, offering a more sustainable and environmentally friendly solution. The need for a whole home battery becomes evident in areas prone to frequent power outages, especially during extreme weather events or in regions with unreliable grid infrastructure.",
        "Whole home batteries emerge as a promising choice for homeowners seeking reliable backup power without the noise, emissions, and maintenance associated with traditional generators. They provide seamless backup power during grid outages, ensuring uninterrupted electricity supply to essential appliances and devices.",
        "Whole home batteries even offer flexibility in energy management, allowing homeowners to optimize energy usage and potentially save on electricity bills through time-of-use pricing strategies."
      ]
    },
    b: {
      h2: "Whole Home Battery Back Up – Installation, Maintenance & Fixes",
      body: [
        "At Colonial Electric, we pride ourselves on standing out from the rest by prioritizing long-lasting relationships with our clients over mere financial transactions. Our commitment extends beyond providing exceptional whole home battery backup solutions – we aim to foster trust and reliability in every interaction.",
        "What sets us apart is our dedication to ensuring seamless installation, meticulous maintenance, and swift fixes for any issues that may arise with your whole home battery system. Our team of experienced technicians is equipped with the expertise and resources to handle installations efficiently, adhering to the highest industry standards.",
        "We understand that the journey doesn’t end with installation. As such, we offer comprehensive maintenance services to keep your whole home battery system running optimally year after year. Our proactive approach to maintenance helps prevent potential issues and ensures maximum uptime for your backup power needs.",
        "In times of unexpected failures or malfunctions, you can rely on our responsive support team to address any concerns promptly and effectively. We prioritize your peace of mind, knowing that your home and loved ones are protected by a reliable whole home battery backup system."
      ]
    },
    faqs: [
      {
        q: "How long will whole house battery backup last?",
        a: [
          "The duration of a whole house battery backup’s operation largely depends on various factors, including the size of the battery bank, the energy demands of your household, and the efficiency of your appliances.",
          "Typically, whole house battery backups are designed to provide power for a specific period, generally, 8-12 hours or in some cases, even a day, during grid outages. At Colonial Electric, we work closely with our clients to assess their energy needs and recommend a battery backup solution that aligns with their requirements for uninterrupted power supply."
        ]
      },
      {
        q: "Do battery backups use a lot of electricity?",
        a: [
          "Battery backups themselves do not consume electricity while they are idle. However, they do require energy to charge and maintain their charge levels. The amount of electricity used for charging depends on the size and capacity of the battery, as well as the frequency of charging cycles. Modern battery backup systems are designed with efficiency in mind, utilizing advanced charging algorithms and energy management techniques to minimize electricity consumption during charging processes."
        ]
      },
      {
        q: "Are home battery backups worth it?",
        a: [
          "Home battery backups can be a worthwhile investment for homeowners seeking reliable backup power solutions and energy independence. They offer several benefits, including seamless transition during power outages, potential savings on electricity bills through energy optimization, and the ability to store surplus energy from renewable sources like solar panels.",
          "In addition, home battery backups contribute to environmental sustainability by reducing reliance on fossil fuel-powered generators and grid electricity. Ultimately, the value of a home battery backup system depends on individual energy needs, budget considerations, and long-term goals for energy resilience and sustainability."
        ]
      },
      {
        q: "How many batteries does it take to run a whole house?",
        a: [
          "The number of batteries required to power a whole house depends on factors such as the energy consumption of the household and the capacity of the batteries. To determine the number of batteries needed, it’s essential to calculate the total energy consumption of the household during a power outage and match it with the capacity of the batteries.",
          "For instance, a 400 amp-hour 6-volt battery can provide approximately 2.4 kilowatt-hours of power. For a three-day battery bank aiming to supply 90 kilowatt-hours of electricity to an average American household, multiple batteries would be necessary.",
          "In the provided example, with each battery offering 2.4 kilowatt-hours, approximately 38 batteries would be required to meet the energy demand for the specified duration. It’s crucial to consult with professionals like Colonial Electric to accurately assess your household’s energy needs and determine the optimal battery configuration for your whole house backup system."
        ]
      }
    ]
  },
  {
    slug: "generator",
    nav: "Generators",
    title: "Generator",
    h1: "Generators",
    heroLine: "Residential & Commercial Generator Services in Weymouth",
    icon: "generator",
    heroAlt: "Generac transfer switch mounted beside a breaker panel labelled for generator power, installed by Colonial Electric",
    heroFocus: "50% 35%",
    a: {
      h2: "Why Hiring a Professional For Generators Is a Must",
      body: [
        "In our world today, generators have served as invaluable assets, providing backup power during emergencies, ensuring continuity of operations in critical facilities, and offering peace of mind to homeowners and businesses alike. However, ensuring that your generator operates reliably and efficiently requires more than just purchasing and installing the equipment; it requires professional expertise and maintenance.",
        {
          list: [
            {
              term: "Expert Installation",
              text: "A professional electrician ensures safe and optimal installation, maximizing performance and longevity."
            },
            {
              term: "Compliance with Codes",
              text: "Licensed professionals ensure adherence to safety regulations, minimizing hazards and regulatory issues."
            },
            {
              term: "Troubleshooting and Repairs",
              text: "Professionals accurately diagnose and promptly repair malfunctions, preventing further damage."
            },
            {
              term: "Routine Maintenance",
              text: "Tailored maintenance schedules keep generators in peak condition for reliable performance."
            },
            {
              term: "Warranty Protection",
              text: "Professional services maintain warranty coverage, safeguarding your investment."
            },
            {
              term: "Safety and Peace of Mind",
              text: "Trained professionals prioritize safety and reliability, offering reassurance for homeowners and businesses."
            }
          ]
        }
      ]
    },
    b: {
      h2: "Colonial Electric: For All Your Generator Needs (Installation, Repair, & Maintenance)",
      body: [
        "Colonial Electric understands that for homeowners and businesses alike, having a reliable generator is essential for ensuring uninterrupted power supply during outages and emergencies. That’s why Colonial Electric is proud to offer comprehensive services for all your generator needs, including installation, repair, and maintenance.",
        {
          list: [
            {
              term: "Generator Installations",
              text: "Our licensed electricians have the expertise to handle the installation of generators of all sizes and types. From assessing your power needs and recommending the right generator for your property to performing the installation with precision and care, we ensure that your backup power system is installed correctly and ready to perform when you need it most."
            },
            {
              term: "Generator Repairs",
              text: "When generator malfunction or breakdown happens, our skilled electricians are equipped to diagnose the issue quickly and accurately. We use advanced diagnostic tools and techniques to identify the root cause of the problem and perform the necessary repairs efficiently, restoring your generator to optimal functionality."
            },
            {
              term: "Generator Maintenance",
              text: "Regular maintenance is key to ensuring that your generator operates reliably and efficiently year after year. Our maintenance services include thorough inspections, testing of critical components, lubrication, fuel system checks, and other preventive measures to keep your generator in peak condition and ready to spring into action at a moment’s notice"
            }
          ]
        }
      ]
    },
    faqs: [],
    products: [
      {
        title: "Whole Home Generators",
        body: "Our Whole Home Generators offer seamless backup power for your entire house during outages. With different sizes and capacities, they integrate directly into your electrical system for automatic operation, ensuring everything runs smoothly when needed."
      },
      {
        title: "Portable Generators",
        body: "Our Portable Generators are compact and versatile, perfect for outdoor events, job sites, and emergencies. Featuring easy-start engines, multiple outlets, and built-in safety features, they offer convenient backup power wherever you go."
      }
    ]
  }
];

// /permanent-outdoor-lighting/ variant (brief §5). Verbatim; "Colonial Electrics" → "Colonial Electric".
export const outdoor = {
  lead: 'Create the perfect ambiance for your outdoor space with our versatile and intelligent outdoor lighting system. Enjoy personalized lighting schedules, adjustable brightness, and the freedom to control your lights from anywhere.',
  panels: [
    {
      id: 'holiday', title: 'Holiday Lighting', icon: 'sparkle',
      lead: 'Tired of tangled lights and precarious ladders? Let Colonial Electric take the hassle out of holiday decorating! We offer professional installation and removal of dazzling holiday lighting displays, so you can focus on enjoying the festive season.',
      groups: [
        { h: 'Customize Your Glow', items: [
          { term: 'Seasonal or Permanent', text: 'Choose temporary installations for the holidays or opt for permanent lights that can be transformed for different celebrations throughout the year.' },
          { term: 'Expert Installation', text: 'Our team of experienced electricians will ensure your lights are installed safely and beautifully.' },
        ] },
        { h: 'Our Services Include', services: true, items: [
          { term: 'Christmas', text: 'Create a winter wonderland with classic white lights, colorful displays, or even animated light shows.' },
          { term: 'Halloween', text: 'Transform your home into a spooky spectacle with eerie orange and purple lights, glowing pumpkins, and more.' },
          { term: 'Hanukkah', text: 'Celebrate the Festival of Lights with warm, inviting displays of blue and white lights.' },
          { term: 'Fourth of July', text: 'Show your patriotic spirit with vibrant red, white, and blue lighting.' },
          { term: 'Valentine’s Day', text: 'Set the mood with romantic pink and red lights.' },
          { term: 'Ramadan', text: 'Create a warm and welcoming atmosphere with soft, twinkling lights.' },
          { term: 'Diwali', text: 'Celebrate the Festival of Lights with dazzling displays of colorful lights.' },
        ] },
      ],
      close: 'Don’t see your favorite holiday? We’re always happy to create custom lighting designs for any occasion. Let us know your vision, and we’ll make it happen!',
    },
    {
      id: 'landscape', title: 'Landscape Lighting', icon: 'bulb',
      lead: 'Let your landscape shine, day and night! Colonial Electric offers professional landscape lighting services that transform your outdoor spaces into stunning, inviting havens.',
      groups: [
        { h: 'Beyond the Ordinary', items: [
          { term: 'Custom Design & Installation', text: 'We collaborate with you to understand your vision and create a custom lighting plan that enhances your property’s natural beauty and functionality.' },
          { term: 'Expertly Crafted Solutions', text: 'Our team of experienced electricians utilizes the latest lighting technology, ensuring safety, efficiency, and breathtaking results.' },
          { term: 'A Wide Range of Options', text: 'From subtle pathway lighting to dramatic accent features, we offer a diverse selection of fixtures to suit every style and budget.' },
          { term: 'Worry-Free Experience', text: 'From initial consultation to final installation, we handle every detail, leaving you to enjoy the magic of your illuminated landscape.' },
        ] },
        { h: 'Our Landscape Lighting Services', services: true, items: [
          { term: 'Garden Lights', text: 'Highlight the vibrant colors and textures of your flowerbeds and foliage.' },
          { term: 'Pathway Lighting', text: 'Create safe and inviting walkways for nighttime enjoyment.' },
          { term: 'Accent Lights', text: 'Emphasize architectural features, trees, and other focal points.' },
          { term: 'Up and Down Lighting', text: 'Add depth and dimension to your landscape with dramatic lighting effects.' },
          { term: 'Spotlights', text: 'Direct focused light onto specific areas, creating captivating visual interest.' },
          { term: 'Floodlights', text: 'Illuminate large areas for added security and functionality.' },
        ] },
      ],
      close: 'Ready to transform your outdoor spaces? Contact Colonial Electric today for a free consultation. We’ll help you create a landscape lighting design that will leave you and your guests in awe.',
    },
    {
      id: 'permanent', title: 'Permanent Lighting', icon: 'sparkle',
      lead: 'Say goodbye to holiday hassles and hello to year-round brilliance! Colonial Electric offers permanent outdoor lighting solutions that transform your home into a stunning spectacle, day or night.',
      groups: [
        { h: 'Beyond Temporary Twinkles', items: [
          { term: 'Expert Design & Installation', text: 'We work with you to create a custom lighting plan that seamlessly integrates with your home’s architecture and enhances its beauty.' },
          { term: 'Invisible Elegance', text: 'Our nearly invisible roofline lighting creates a breathtaking nighttime display without compromising your home’s aesthetics.' },
          { term: 'Versatile Illumination', text: 'Transform your patios, gazebos, decks, walkways, and more into inviting spaces for year-round enjoyment.' },
          { term: 'Smart Technology & Efficiency', text: 'Our advanced LED lights offer customizable color-changing options and energy-saving performance, ensuring both beauty and sustainability.' },
        ] },
        { h: 'Our Permanent Lighting Services', services: true, items: [
          { term: 'Roofline Lighting', text: 'Create a dazzling nighttime display that sets your home apart.' },
          { term: 'Patio & Deck Lighting', text: 'Transform your outdoor living spaces into inviting havens.' },
          { term: 'Gazebo & Pergola Lighting', text: 'Enhance the charm and ambiance of your outdoor structures.' },
          { term: 'Walkway & Pathway Lighting', text: 'Create safe and inviting pathways for nighttime enjoyment.' },
          { term: 'Pool & Lanai Lighting', text: 'Add a touch of magic to your pool area and create a relaxing atmosphere.' },
          { term: 'Boat Dock Lighting', text: 'Ensure safety and enhance visibility around your dock.' },
        ] },
      ],
      close: 'Ready to experience the magic of permanent lighting? Contact Colonial Electric today for a free consultation. We’ll help you create a lighting design that will illuminate your world with elegance and style.',
    },
    {
      id: 'event', title: 'Event Lighting', icon: 'bulb',
      lead: 'Make your events unforgettable! Colonial Electric specializes in crafting breathtaking custom lighting designs that transform any occasion into a dazzling spectacle.',
      groups: [
        { h: 'Beyond Ordinary Illumination', items: [
          { term: 'Expert Design & Installation', text: 'We work closely with you to understand your vision and create a unique lighting plan that perfectly complements your event’s theme and atmosphere.' },
          { term: 'A Symphony of Light', text: 'From dramatic spotlights to elegant uplighting, we utilize a wide range of lighting techniques to create a captivating ambiance.' },
          { term: 'Unparalleled Versatility', text: 'We cater to events of all sizes and styles, from intimate gatherings to grand celebrations.' },
          { term: 'Indoor & Outdoor Expertise', text: 'Our team is equipped to illuminate both indoor and outdoor spaces, transforming any venue into a magical setting.' },
        ] },
        { h: 'Our Event Lighting Services', services: true, items: [
          { term: 'Entryway & Welcome Area Lighting', text: 'Create a grand entrance that sets the tone for your event.' },
          { term: 'Dance Floor Lighting', text: 'Transform your dance floor into a vibrant, energetic hub.' },
          { term: 'Dining Area Lighting', text: 'Enhance the ambiance of your dining area with warm, inviting lighting.' },
          { term: 'Stage Lighting', text: 'Highlight your performers and create a captivating visual experience.' },
          { term: 'Custom Gobo Projections', text: 'Add a personal touch with custom-designed gobo projections.' },
          { term: 'Marquee Lighting', text: 'Create a stunning visual impact with eye-catching marquee lights.' },
          { term: 'Bistro Lighting', text: 'Add a touch of romance and charm with classic bistro lights.' },
        ] },
      ],
      close: 'Ready to illuminate your next event? Contact Colonial Electric today for a free consultation. We’ll help you create a lighting design that will leave your guests in awe.',
    },
  ],
  // Eight-item feature grid. Declared fixes only: "custmoize" → "customize"; sentence-case starts; "Led"/"led" → "LED";
  // title-case headings; "ip65" → "IP65"; "The most colors" keeps only its first sentence.
  features: [
    { title: 'Cloud Control', body: 'The watts cloud allows you to connect to your lights from anywhere as long as you have an internet connection. Use our lights for security, no matter where in the world you are.' },
    { title: 'Timer & Schedules', body: 'Not only are our lights extremely efficient but we also offer a timer and scheduler to set your lights to turn on and off automatically.' },
    { title: 'Custom Animations', body: 'Our simple & unique app allows you to create beautiful static patterns, & customize your own animations. Our library of pre-built animations is constantly getting updated.' },
    { title: 'True Warm White', body: 'Our lights can be used all year round with unique warm white LED that allows for a luxurious and brilliant glow that lights up your house for safety and makes your neighbours jealous.' },
    { title: 'LED Lights', body: 'Our lights are one of, if not, the best in the industry with low power, warm white LEDs, water proof rating, and the perfect brightness to light up your life but not blind your neighbors' },
    { title: 'The Most Colors', body: 'Our unique pixel lights have the technical capability of 1.6m colors!' },
    { title: 'Water Resistance', body: 'Our unique pixel lights and track system have an IP65 rating which allows you to still pressure wash your siding without worrying about the lights.' },
    { title: 'Permanent Install', body: 'No more risking your life to get to the top story of your home to put up christmas lights. Our lights are permanent and usually increase the value of our client’s homes.' },
  ],
};

// "Why Choose Colonial Electric?" (brief §5.7), verbatim; live typo "serivce" fixed. Intro = shared whyIntro.
export const whyChoose = {
  h2: 'Why Choose Colonial Electric?',
  cards: [
    { title: 'Transparent', body: 'We stand out for our unwavering commitment to transparency. From project estimates to the final invoice, we ensure every aspect of our service is clear and understandable. We never keep customers in the dark!' },
    { title: 'Premium service', body: 'Our dedication to quality is beyond compare. We hold ourselves to the highest standards, from the materials we use to the expertise of our technician, we spare no effort in delivering premium results.' },
    { title: 'Commitment to quality', body: 'When you choose us, you choose reliability. We know the importance of dependable electrical systems for your home or business, and we can guarantee to provide the solution that you can count on.' },
  ],
};

export const servicesIntro = {
  h2: 'Your One-stop Solution For All Things Electrical',
  body: 'If you’re looking for a premium electrical service that offers everything you need, then you’re in the right place. From quality installations to expert repairs, we pride ourselves on delivering top-notch electrical services tailored to meet your specific requirements.',
};

// icon = key in src/partials/icons.mjs
export const serviceCards = [
  { title: 'Electrical Outlets', href: 'electrical-outlets/', icon: 'outlet', blurb: 'No more messy cords or limited access to power sources! Our electrical outlet services ensure that you have convenient access to electricity wherever you need it. Whether it’s for your home or business!' },
  { title: 'Electrical Panel Upgrades', href: 'electrical-panel-upgrade/', icon: 'panel', blurb: 'Our team specializes in upgrading outdated panels to meet current safety standards and accommodate increased electrical loads. Enjoy safe, and energy-efficient power!' },
  { title: 'Generators', href: 'generator/', icon: 'generator', blurb: 'Never be left in the dark again! Our generator services provide reliable backup power for your home or business, ensuring uninterrupted electricity during outages. Stay powered up and worry-free.' },
  { title: 'Whole-home Battery Backup', href: 'whole-home-battery-back-up/', icon: 'battery', blurb: 'Embrace reliability with our whole-home battery backup services. Keep your place running smoothly, even during power outages, while reducing your carbon footprint.' },
  { title: 'Surge Protection', href: 'surge-protection/', icon: 'surge', blurb: 'Shield your valuable electronics from harmful power surges with our surge protection services. Safeguard your appliances and devices against voltage spikes, ensuring their longevity and reliability.' },
  { title: 'Ceiling Fan Installation', href: 'ceiling-fan-installation/', icon: 'fan', blurb: 'Enhance comfort and energy efficiency in any room with our professional ceiling fan installation services. Enjoy improved air circulation, reduced energy costs, and added aesthetic appeal.' },
  { title: 'Lighting', href: 'lighting-additions/', icon: 'bulb', blurb: 'Brighten up your surroundings with our lighting services. From elegant chandeliers to practical under-cabinet lighting, we offer custom solutions tailored to your needs!' },
  { title: 'EV Charger Installation', href: 'ev-charger-installation/', icon: 'ev', blurb: 'Join the revolution with our E.V. charger installation services. Experience the convenience of charging your electric vehicle at home, ensuring you’re always ready to hit the road.' },
  { title: 'Whole-house Wiring', href: 'whole-house-wiring-or-rewiring/', icon: 'wiring', blurb: 'Upgrade your property’s electrical system with our whole-house wiring or rewiring services. From outdated systems to new construction projects, our team can handle it.' },
  { title: 'Remodels', href: 'remodels/', icon: 'remodel', blurb: 'Transform your home or business with professional electrical remodeling. Whether you’re updating a single room or renovating your entire property, you can trust our expert electricians.' },
  { title: 'Electrical Inspection', href: 'electrical-inspections/', icon: 'inspect', blurb: 'Ensure the safety and reliability of your electrical system with our comprehensive electrical inspection services. Our team will meticulously assess wiring, outlets, panels, and more!' },
  { title: 'Recessed Lighting', href: 'recessed-lighting/', icon: 'recessed', blurb: 'Illuminate your space with style and sophistication using recessed lighting services. Achieve a sleek and modern look while maximizing light distribution and energy efficiency.' },
];

// Shared service-template intro (brief §5.2, verbatim)
export const serviceIntro = 'Whether you need it for your home, or business, Colonial Electric is your trusted partner for all your electrical service needs in Weymouth and the surrounding areas. Our team of experienced electricians is dedicated to providing top-notch residential and commercial electrical services tailored to meet your specific requirements. From simple repairs and installations to complex electrical projects, we handle it all with precision and expertise. Our commitment to quality and customer satisfaction sets us apart in the industry. When you choose Colonial Electric, you can rest assured that your electrical needs are in capable hands.';
