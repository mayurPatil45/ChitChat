import { Link } from 'react-router-dom'
import Button from '../components/layout/Button'
import Input from '../components/layout/Input'

export default function Home() {

  const user = JSON.parse(localStorage.getItem('chat-user'));

  return (
    <div>
      <section className="w-full py-28">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center md:gap-12 md:px-6 lg:flex-row lg:justify-center">
          <div className="flex flex-col items-center gap-6 lg:items-center lg:gap-8 xl:gap-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-normal sm:text-5xl xl:text-6xl/none">
                Welcome to our Chat App!
              </h1>
              <p className="text-gray-500 md:text-lg dark:text-gray-400 my-4">
                Connect with friends, share photos and videos, and stay connected anytime, anywhere.
              </p>
            </div>
            <Link to={user ? "/chats" : "/login"}>
              <Button className="px-5 py-3">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="310"
              src="./Hero-6.webp"
              width="550"
              loading='lazy'
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Join the Conversation!
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                  Join our chat community and connect with friends, family, and colleagues. Share messages, photos, and
                  more in real-time.
                </p>
              </div>
              <div className="w-full max-w-sm mx-auto space-y-2">
                <form className="grid gap-2 mb-5">
                  <Input className='py-3' placeholder="Enter your username..." type="text" />

                  <Button type="submit">Join Chat</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400 mx-auto">
                  By joining, you agree to our <Link className="underline underline-offset-2" href="#">Terms & Conditions</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
