"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false)

  async function mockSubmit(e: React.FormEvent, actionName: string) {
    e.preventDefault(); setLoading(true)
    try { await new Promise((r) => setTimeout(r, 1200)); toast.success(`${actionName} succes!`) } 
    catch { toast.error("Fout bij inloggen") } finally { setLoading(false) }
  }

  return (
    <main className="fixed inset-0 w-full flex flex-col items-center bg-background px-4 overflow-y-auto">
      
      <Card className="w-full max-w-sm border-[#3A3D50] bg-card shadow-xl rounded-2xl my-auto flex flex-col overflow-hidden">
        <CardHeader className="p-5 pb-3 shrink-0">
          <CardTitle className="text-xl font-bold tracking-tight text-white">Welcome</CardTitle>
          <CardDescription className="text-xs text-gray-400">Log in or create an account</CardDescription>
        </CardHeader>
        
        <CardContent className="p-5 pt-0 overflow-y-auto flex-1">
          <Tabs defaultValue="login" className="w-full">
            
            {/* GEFIXTE BALK: We gebruiken flex-row en p-1 zodat de 3 knoppen altijd naast elkaar móéten staan, net als op web */}
            <TabsList className="flex flex-row justify-between items-center w-full mb-5 h-11 bg-background/50 border border-[#3A3D50] rounded-xl p-1 shrink-0 gap-1">
              <TabsTrigger 
                value="login" 
                className="flex-1 h-full text-[10px] uppercase font-bold tracking-wider sm:tracking-widest rounded-lg data-[state=active]:bg-[#7217E8] data-[state=active]:text-white transition-all text-gray-400"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="flex-1 h-full text-[10px] uppercase font-bold tracking-wider sm:tracking-widest rounded-lg data-[state=active]:bg-[#7217E8] data-[state=active]:text-white transition-all text-gray-400"
              >
                Register
              </TabsTrigger>
              <TabsTrigger 
                value="forgot" 
                className="flex-1 h-full text-[10px] uppercase font-bold tracking-wider sm:tracking-widest rounded-lg data-[state=active]:bg-[#7217E8] data-[state=active]:text-white transition-all text-gray-400"
              >
                Reset
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: LOGIN */}
            <TabsContent value="login" className="outline-none">
              <form onSubmit={(e) => mockSubmit(e, 'Login')} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Email</Label>
                  <Input type="email" required className="bg-background/50 border-[#3A3D50] h-10 rounded-xl text-white" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Password</Label>
                  <Input type="password" required className="bg-background/50 border-[#3A3D50] h-10 rounded-xl text-white" />
                </div>
                <Button disabled={loading} className="w-full h-11 mt-2 bg-[#7217E8] hover:bg-[#5e12c4] rounded-xl font-bold uppercase tracking-widest text-xs text-white">
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </TabsContent>

            {/* TAB 2: REGISTER */}
            <TabsContent value="register" className="outline-none">
              <form onSubmit={(e) => mockSubmit(e, 'Registratie')} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Email</Label>
                  <Input type="email" required className="bg-background/50 border-[#3A3D50] h-10 rounded-xl text-white" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Password</Label>
                  <Input type="password" required className="bg-background/50 border-[#3A3D50] h-10 rounded-xl text-white" />
                </div>
                <Button disabled={loading} className="w-full h-11 mt-2 bg-[#7217E8] hover:bg-[#5e12c4] rounded-xl font-bold uppercase tracking-widest text-xs text-white">
                  {loading ? "Creating..." : "Register"}
                </Button>
              </form>
            </TabsContent>

            {/* TAB 3: RESET PASSWORD */}
            <TabsContent value="forgot" className="outline-none">
              <form onSubmit={(e) => mockSubmit(e, 'Wachtwoord reset')} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Email Address</Label>
                  <Input type="email" required className="bg-background/50 border-[#3A3D50] h-10 rounded-xl text-white" />
                </div>
                <p className="text-[11px] text-gray-400 px-1 leading-relaxed">
                  Enter your email address and we will send you a secure link to reset your account credentials.
                </p>
                <Button disabled={loading} className="w-full h-11 mt-2 bg-[#7217E8] hover:bg-[#5e12c4] rounded-xl font-bold uppercase tracking-widest text-xs text-white">
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
      
    </main>
  )
}