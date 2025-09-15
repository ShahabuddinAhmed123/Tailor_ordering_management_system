"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Phone, Video, MoreVertical } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "customer" | "business"
  timestamp: Date
  read: boolean
}

interface Conversation {
  id: string
  customerName: string
  customerInitials: string
  orderNumber: string
  orderItem: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  messages: Message[]
  isOnline: boolean
}

const initialConversations: Conversation[] = [
  {
    id: "1",
    customerName: "Ahmed Ali",
    customerInitials: "AA",
    orderNumber: "#ORD-001",
    orderItem: "Shalwar Kameez",
    lastMessage: "Hello Ahmed! Your order is currently in progress.",
    lastMessageTime: new Date("2024-01-15T10:32:00"),
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Hi, I wanted to check the status of my order.",
        sender: "customer",
        timestamp: new Date("2024-01-15T10:30:00"),
        read: true,
      },
      {
        id: "2",
        text: "Hello Ahmed! Your order is currently in progress. We'll have it ready by tomorrow.",
        sender: "business",
        timestamp: new Date("2024-01-15T10:32:00"),
        read: true,
      },
      {
        id: "3",
        text: "That's great! Can you also let me know about the fitting?",
        sender: "customer",
        timestamp: new Date("2024-01-15T10:35:00"),
        read: true,
      },
      {
        id: "4",
        text: "We'll schedule a fitting session once it's ready. I'll call you tomorrow morning.",
        sender: "business",
        timestamp: new Date("2024-01-15T10:37:00"),
        read: true,
      },
    ],
  },
  {
    id: "2",
    customerName: "Fatima Khan",
    customerInitials: "FK",
    orderNumber: "#ORD-002",
    orderItem: "Wedding Dress",
    lastMessage: "The embroidery work looks amazing!",
    lastMessageTime: new Date("2024-01-15T09:45:00"),
    unreadCount: 2,
    isOnline: false,
    messages: [
      {
        id: "1",
        text: "Hello! I wanted to discuss some changes to my wedding dress design.",
        sender: "customer",
        timestamp: new Date("2024-01-15T09:30:00"),
        read: true,
      },
      {
        id: "2",
        text: "Of course! What changes would you like to make?",
        sender: "business",
        timestamp: new Date("2024-01-15T09:32:00"),
        read: true,
      },
      {
        id: "3",
        text: "I'd like to add some pearl work on the sleeves and change the neckline slightly.",
        sender: "customer",
        timestamp: new Date("2024-01-15T09:35:00"),
        read: true,
      },
      {
        id: "4",
        text: "That sounds beautiful! The pearl work will add an elegant touch. Can you come in tomorrow for a consultation?",
        sender: "business",
        timestamp: new Date("2024-01-15T09:40:00"),
        read: true,
      },
      {
        id: "5",
        text: "Yes, I'll be there at 2 PM. Also, I saw the progress photos you sent.",
        sender: "customer",
        timestamp: new Date("2024-01-15T09:43:00"),
        read: false,
      },
      {
        id: "6",
        text: "The embroidery work looks amazing!",
        sender: "customer",
        timestamp: new Date("2024-01-15T09:45:00"),
        read: false,
      },
    ],
  },
  {
    id: "3",
    customerName: "Hassan Sheikh",
    customerInitials: "HS",
    orderNumber: "#ORD-003",
    orderItem: "Formal Suit",
    lastMessage: "Perfect! Thank you so much.",
    lastMessageTime: new Date("2024-01-15T08:20:00"),
    unreadCount: 1,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Good morning! Is my formal suit ready for pickup?",
        sender: "customer",
        timestamp: new Date("2024-01-15T08:00:00"),
        read: true,
      },
      {
        id: "2",
        text: "Good morning Hassan! Yes, your suit is ready. You can pick it up anytime today.",
        sender: "business",
        timestamp: new Date("2024-01-15T08:05:00"),
        read: true,
      },
      {
        id: "3",
        text: "Great! I'll be there around 3 PM. Do I need to bring anything?",
        sender: "customer",
        timestamp: new Date("2024-01-15T08:10:00"),
        read: true,
      },
      {
        id: "4",
        text: "Just bring your receipt and ID. We'll have everything ready for you.",
        sender: "business",
        timestamp: new Date("2024-01-15T08:15:00"),
        read: true,
      },
      {
        id: "5",
        text: "Perfect! Thank you so much.",
        sender: "customer",
        timestamp: new Date("2024-01-15T08:20:00"),
        read: false,
      },
    ],
  },
]

export default function ChatSystem() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [activeConversationId, setActiveConversationId] = useState<string>("1")
  const [newMessage, setNewMessage] = useState("")

  const activeConversation = conversations.find((conv) => conv.id === activeConversationId)

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: "business",
      timestamp: new Date(),
      read: true,
    }

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: message.text,
              lastMessageTime: message.timestamp,
            }
          : conv,
      ),
    )

    setNewMessage("")

    // Simulate customer response after 2-3 seconds
    setTimeout(
      () => {
        const responses = [
          "Thank you for the update!",
          "That sounds good to me.",
          "I appreciate your help.",
          "Perfect, looking forward to it!",
          "Great service as always!",
          "Thank you so much!",
          "That works for me.",
          "Excellent, thank you!",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const customerMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "customer",
          timestamp: new Date(),
          read: false,
        }

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, customerMessage],
                  lastMessage: customerMessage.text,
                  lastMessageTime: customerMessage.timestamp,
                  unreadCount: conv.id === activeConversationId ? conv.unreadCount : conv.unreadCount + 1,
                }
              : conv,
          ),
        )
      },
      Math.random() * 2000 + 1000,
    ) // Random delay between 1-3 seconds
  }

  const handleConversationClick = (conversationId: string) => {
    setActiveConversationId(conversationId)

    // Mark messages as read when opening conversation
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              unreadCount: 0,
              messages: conv.messages.map((msg) => ({ ...msg, read: true })),
            }
          : conv,
      ),
    )
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  const formatLastMessageTime = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-3 h-[600px]">
      {/* Conversations List */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Active Conversations</CardTitle>
          <CardDescription>Customer support chats</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-2 p-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    activeConversationId === conversation.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => handleConversationClick(conversation.id)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="text-sm font-medium">{conversation.customerInitials}</AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{conversation.customerName}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {formatLastMessageTime(conversation.lastMessageTime)}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{conversation.orderNumber}</p>
                    <p className="text-xs text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="md:col-span-2">
        {activeConversation ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{activeConversation.customerInitials}</AvatarFallback>
                    </Avatar>
                    {activeConversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">Chat with {activeConversation.customerName}</CardTitle>
                    <CardDescription>
                      {activeConversation.orderNumber} - {activeConversation.orderItem}
                      {activeConversation.isOnline && <span className="text-green-600 ml-2">● Online</span>}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "business" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === "business" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "business" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select a conversation to start chatting</p>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
