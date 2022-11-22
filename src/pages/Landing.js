import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ImageHero from '../assets/img/hero.svg'
import ImageTeam from '../assets/img/12.svg'
import ImageSuccess from '../assets/img/13.svg'
import { MenuIcon } from '../icons'
import { AuthContext } from '../context/AuthContext'

import { Button, Card, CardBody, Avatar, Badge } from '@windmill/react-ui'

function SectionTwoBlocks({children}) {
  return (
    <section className="flex justify-center py-8 md:py-12">
      <div className="w-full md:w-11/12 lg:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {children}
        </div>
      </div>
    </section>
  )
}

function SectionCenteredHeader({children}) {
  return (
    <section className="flex justify-center py-8 md:py-16 bg-purple-600">
      <div className="flex flex-col text-center items-center w-11/12 lg:w-2/3 text-white">
        {children}
      </div>
    </section>
  )
}

function SectionFeaturesGrid({children}) {
  return (
    <section className="flex justify-center py-8 md:py-16 bg-gray-50">
      <div className="text-center w-11/12 lg:w-3/4">
        <h1 className="text-4xl font-bold text-gray-700">Everything you need to launch your show</h1>
        <p className="my-4 text-xl text-gray-600">The features you need, nothing you don't.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {children}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({title, body}) {
  return (
    <Card colored className="bg-white shadow-lg">
      <CardBody className="p-6">
        <p className="mb-4 text-lg text-gray-600 font-semibold">{title}</p>
        <p className="text-gray-500">
          {body}
        </p>
      </CardBody>
    </Card>
  )
}

function TestimonialCard() {
  return (
    <Card colored className="bg-white text-gray-700 shadow-lg text-left">
      <CardBody className="m-4">
        <div className="flex">
          <Avatar size="large" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Judith" />
          <div className="ml-2">
            <p className="font-semibold">Judith Ipsum</p>
            <p className="text-xs text-gray-500">@judithipsum</p>
          </div>
        </div>
        <p className="mt-4 text-lg text-gray-600">
          Rocket has helped me build my awesome SaaS in no time. Highly recommended to anyone who want to 
          kickstart development and not spend hours building authentication and stripe billing. Get started now!
        </p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <Badge type="primary">#tailwindcss</Badge>
            <Badge type="primary" className="ml-2">
              #react
            </Badge>
          </div>
          <div>
            <Button>
              Read more
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function NavbarContent() {
  const { user } = useContext(AuthContext)

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="flex items-center grid grid-cols-1 lg:grid-cols-auto lg:grid-rows-1 lg:grid-flow-col gap-4 text-sm font-bold text-gray-800">
        <a href="#pablo" className="hover:text-gray-600">Home</a>
        <a href="#pablo" className="hover:text-gray-600">About</a>
        <a href="#pablo" className="hover:text-gray-600">FAQs</a>
        <a href="#pablo" className="hover:text-gray-600">Pricing</a>
      </div>
      {!user &&
        <Link to="/auth/login">
          <Button className="w-full">Log In</Button>
        </Link>
      }
      {!user &&
        <Link to="/auth/create-account">
          <Button layout="outline" className="w-full">Sign Up</Button>
        </Link>
      }
      {user &&
        <Link to="/app">
          <Button className="w-full">Dashboard</Button>
        </Link>
      }
    </div>
  )
}

function DesktopNavbar() {
  return (
    <aside className="hidden w-full lg:block">
      <div className="flex justify-center">
        <div className="w-3/4">
          <div className="py-4 text-gray-500">
            <div className="flex-1 flex items-center justify-between">
              <Link to="/" className="text-xl font-bold text-gray-800">
                Rocket
              </Link>
              <NavbarContent />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}


function MobileNavbar() {
  const [isNavbarOpen, setNavbarOpen] = React.useState(false)

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen)
  }

  return (
    <aside className="flex justify-center">
      <div className="w-full md:w-11/12 lg:hidden">
        <div className="px-4 py-4 text-gray-500">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <Link to="/" className="text-xl font-bold text-gray-800">
                Rocket
              </Link>
              <button
                className="p-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                onClick={toggleNavbar}
                aria-label="Menu"
              >
                <MenuIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {isNavbarOpen && <NavbarContent />}
          </div>
        </div>
      </div>
    </aside>
  )
}

function Landing() {
  return (
  <>
    <DesktopNavbar />
    <MobileNavbar />
    <main>
      <div className="lg:pt-12">
        <SectionTwoBlocks>
          <div className="flex flex-col px-4 lg:px-0">
            <h1 className="mb-4 text-5xl font-bold text-gray-800">Build your Node.js & React SaaS app faster</h1>
            <p className="mb-8 lg:w-5/6 text-lg text-gray-600">A boilerplate for building production-ready SaaS apps using Node.js, React, and MongoDB. The app comes with built-in features including authentication, payments, UI intergration and more.</p>
            <div className="flex flex-row w-full space-x-4">
              <Link to="/app">
                <Button size="larger">Get Started</Button>
              </Link>
              <Link to="/app">
                <Button size="larger" layout="outline">Try demo</Button>
              </Link>
            </div>
          </div>
          <div className="h-64 md:h-auto px-4 md:px-0">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={ImageHero}
              alt="Office"
            />
          </div>
        </SectionTwoBlocks>
        <div className="lg:-mt-20">
          <svg height="100%" width="100%" id="svg" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,133 0,133 C 76.10526315789471,146.33014354066984 152.21052631578942,159.6602870813397 241,145 C 329.7894736842106,130.3397129186603 431.263157894737,87.68899521531101 541,92 C 650.736842105263,96.31100478468899 768.736842105263,147.58373205741628 868,157 C 967.263157894737,166.41626794258372 1047.7894736842106,133.97607655502392 1140,123 C 1232.2105263157894,112.02392344497608 1336.1052631578946,122.51196172248804 1440,133 C 1440,133 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#A78BFA" className="transition-all duration-300 ease-in-out delay-150"></path><path d="M 0,400 C 0,400 0,266 0,266 C 108.19138755980859,285.9521531100479 216.38277511961718,305.90430622009575 322,312 C 427.6172248803828,318.09569377990425 530.6602870813399,310.334928229665 608,290 C 685.3397129186601,269.665071770335 736.9760765550238,236.75598086124404 825,238 C 913.0239234449762,239.24401913875596 1037.4354066985647,274.6411483253588 1146,285 C 1254.5645933014353,295.3588516746412 1347.2822966507176,280.6794258373206 1440,266 C 1440,266 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#7C3AED" className="transition-all duration-300 ease-in-out delay-150"></path></svg>
        </div>
      </div>
      <SectionCenteredHeader>
        <h1 className="mb-4 text-4xl font-semibold">Do it all with Rocket</h1>
        <p className="mb-4 text-lg">Bring your audience data, marketing channels, and insights together so you can reach your goals faster—all from a single platform.</p>
      </SectionCenteredHeader>
      <SectionTwoBlocks>
        <div className="h-64 md:h-auto">
          <img
            aria-hidden="true"
            className="object-cover w-full h-full rounded-sm"
            src={ImageSuccess}
            alt="Office"
          />
        </div>
        <div className="flex flex-col justify-center px-12">
          <h1 className="mb-4 text-2xl font-semibold text-gray-700">Get stared on your app instantly</h1>
          <p className="mb-4 text-md text-gray-500">Save weeks of time implementing basic features like authentication and billing, and get started on your product instantly.
          </p>
        </div>
      </SectionTwoBlocks>
      <SectionTwoBlocks>
        <div className="flex flex-col justify-center px-12">
          <h1 className="mb-4 text-2xl font-semibold text-gray-700">Simple setup at zero cost</h1>
          <p className="mb-12 text-md text-gray-500">You get full access to the codebase which can be customized to best suit you app. The codebase comes with build and run scripts along with a documentation to help you get started in no time.
          </p>
          <Button size="larger">Buy Now</Button>
        </div>
        <div className="h-64 md:h-auto">
          <img
            aria-hidden="true"
            className="object-cover w-full h-full rounded-sm"
            src={ImageTeam}
            alt="Office"
          />
        </div>
      </SectionTwoBlocks>
      <SectionFeaturesGrid>
        <FeatureCard title="REST API" body="Rest API with validation and built-in docs. Protection against brute-force attacks." />
        <FeatureCard title="NoSQL Database" body="MongoDB object data modeling using Mongoose." />
        <FeatureCard title="Users & Authentication" body="Advanced JWT authentication with protection against CSRF and XSS attacks." />
        <FeatureCard title="Subscription Payments" body="Integrated subscription management and billing system built using Stripe." />
        <FeatureCard title="Responsive Templates" body="Responsive UI built using tailwind CSS which works seamlessly across all devices." />
        <FeatureCard title="Security & Permissions" body="Manage permissions and restrict access for each user group." />
      </SectionFeaturesGrid>
      <SectionCenteredHeader>
        <div className="w-full lg:w-3/4">
          <TestimonialCard />
        </div>
      </SectionCenteredHeader>
      <SectionCenteredHeader>
        <h1 className="text-4xl font-semibold">Your voice is waiting to be heard.</h1>
        <h1 className="text-2xl text-gray-200">Get started today and bring your ideas to the world.</h1>
        <div><Button size="larger">Learn more -></Button></div>
      </SectionCenteredHeader>
    </main>

    <footer>
      <SectionTwoBlocks>
        <div className="flex items-center lg:w-3/4 px-4">
          <h1 className="mb-4 text-2xl font-semibold text-gray-700">Give yourself a head start, save months of time compared to building it by yourself.
          </h1>
        </div>
        <div className="flex justify-end px-4">
          <div className="flex flex-row w-full lg:w-3/4 justify-between">
            <div>
              <p className="mb-2 font-semibold text-gray-700 uppercase">Useful Links</p>
              <div className="grid grid-cols-1 text-right text-sm text-gray-600">
                <a href="#pablo" className="hover:text-gray-800">Home</a>
                <a href="#pablo" className="hover:text-gray-800">About</a>
                <a href="#pablo" className="hover:text-gray-800">FAQs</a>
                <a href="#pablo" className="hover:text-gray-800">Pricing</a>
              </div>
            </div>
            <div>
              <p className="mb-2 font-semibold text-gray-700 uppercase">Other Resources</p>
              <div className="grid grid-cols-1 text-right text-sm text-gray-600">
                <a href="#pablo" className="hover:text-gray-800">Privacy Policy</a>
                <a href="#pablo" className="hover:text-gray-800">Terms of Service</a>
                <a href="#pablo" className="hover:text-gray-800">Trademark Policy</a>
              </div>
            </div>
          </div>
        </div>
      </SectionTwoBlocks>
    </footer>
  </>
  )
}

export default Landing
