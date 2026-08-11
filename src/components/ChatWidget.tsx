import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  Loader2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUIStore } from '@/stores/ui-store'
import { trackChatEvent } from '@/lib/analytics'
import { sendChatMessage, type ChatMessage as APIChatMessage } from '@/services/chat-api-client'
import { submitCapturedChatLead, setPendingLeadData } from '@/services/chat-lead'
import { cn } from '@/lib/utils'

export interface ChatMessageItem extends APIChatMessage {
  id: string
  timestamp: string
  showLeadForm?: boolean
  leadSubmitted?: boolean
}

const INITIAL_QUICK_ACTIONS = [
  { label: '🌐 Website', prompt: 'I want to build a website for my business.' },
  { label: '🤖 AI solution', prompt: 'I am interested in an AI chatbot or AI solution.' },
  { label: '💬 WhatsApp automation', prompt: 'I only need WhatsApp automation for my business.' },
  { label: '⚙️ Business automation', prompt: 'I want to automate my business workflows and lead capture.' },
  { label: '💡 Not sure yet', prompt: 'What services does BuzzleMax offer?' },
]

const CONTEXTUAL_QUICK_ACTIONS = [
  { label: 'Get a website', prompt: 'What kind of websites do you build and what is the starting cost?' },
  { label: 'Build an AI solution', prompt: 'How does an AI chatbot or voice agent work for my business?' },
  { label: 'Automate WhatsApp', prompt: 'Can I get WhatsApp automation as a standalone solution?' },
  { label: 'Get a rough estimate', prompt: 'How much does a project cost?' },
  { label: 'Talk to BuzzleMax', prompt: 'I want to talk to someone on the BuzzleMax team.' },
]

function SafeMarkdownText({ text, isUser }: { text: string; isUser?: boolean }) {
  if (!text) return null
  const lines = text.split('\n')

  return (
    <div className="space-y-1.5 text-sm leading-relaxed">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={lineIdx} className="h-1" />

        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')
        const contentText = isBullet ? trimmed.replace(/^[•\-*]\s*/, '') : trimmed

        const parts = contentText.split(/(\*\*.*?\*\*)/g)
        const renderedParts = parts.map((part, partIdx) => {
          if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
            return (
              <strong key={partIdx} className={cn('font-semibold', isUser ? 'text-primary-foreground' : 'text-foreground')}>
                {part.slice(2, -2)}
              </strong>
            )
          }
          return part
        })

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-1">
              <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', isUser ? 'bg-primary-foreground' : 'bg-primary')} />
              <p className={cn('flex-1', isUser ? 'text-primary-foreground' : 'text-foreground')}>{renderedParts}</p>
            </div>
          )
        }

        return (
          <p key={lineIdx} className={isUser ? 'text-primary-foreground' : 'text-foreground'}>
            {renderedParts}
          </p>
        )
      })}
    </div>
  )
}

export function ChatWidget() {
  const { chatWidgetOpen, setChatWidgetOpen, chatPresetPrompt, clearChatPrompt } = useUIStore()

  const [messages, setMessages] = React.useState<ChatMessageItem[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm the BuzzleMax AI assistant 👋\n\nWhat are you looking to build or automate?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const [inputValue, setInputValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasStarted, setHasStarted] = React.useState(false)
  const [unreadCount, setUnreadCount] = React.useState(0)
  const [hasOpenedOnce, setHasOpenedOnce] = React.useState(false)

  // In-chat lead capture form state
  const [leadName, setLeadName] = React.useState('')
  const [leadEmail, setLeadEmail] = React.useState('')
  const [leadReq, setLeadReq] = React.useState('')
  const [isSubmittingLead, setIsSubmittingLead] = React.useState(false)

  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const scrollToBottom = React.useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleSendMessage = React.useCallback(
    async (textToSend?: string) => {
      const text = (textToSend || inputValue).trim()
      if (!text || isLoading) return

      if (!hasStarted) {
        setHasStarted(true)
        trackChatEvent('chat_started')
      }

      const lowerText = text.toLowerCase()
      if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('estimate')) {
        trackChatEvent('pricing_asked')
      } else if (
        lowerText.includes('website') ||
        lowerText.includes('ai') ||
        lowerText.includes('whatsapp') ||
        lowerText.includes('automation')
      ) {
        trackChatEvent('service_selected', { service: text })
      }

      const userMessage: ChatMessageItem = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages((prev) => {
        const updated = [...prev, userMessage]

        // Async API call inside callback context
        const apiPayload: APIChatMessage[] = updated.map((m) => ({
          role: m.role,
          content: m.content,
        }))

        setIsLoading(true)
        sendChatMessage(apiPayload)
          .then((response) => {
            const assistantMessage: ChatMessageItem = {
              id: `ai-${Date.now()}`,
              role: 'assistant',
              content: response.message,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              showLeadForm: response.leadCaptureRecommended,
            }
            setMessages((mPrev) => [...mPrev, assistantMessage])
          })
          .catch(() => {
            const errorMessage: ChatMessageItem = {
              id: `err-${Date.now()}`,
              role: 'assistant',
              content:
                'Something went wrong on my side. You can still reach the BuzzleMax team through the contact form.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              showLeadForm: true,
            }
            setMessages((mPrev) => [...mPrev, errorMessage])
          })
          .finally(() => {
            setIsLoading(false)
          })

        return updated
      })

      setInputValue('')
    },
    [inputValue, isLoading, hasStarted]
  )

  React.useEffect(() => {
    if (chatWidgetOpen) {
      scrollToBottom()
      setUnreadCount(0)
      if (!hasOpenedOnce) {
        setHasOpenedOnce(true)
        trackChatEvent('chat_opened')
      }
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [chatWidgetOpen, scrollToBottom, hasOpenedOnce])

  React.useEffect(() => {
    if (chatWidgetOpen) {
      scrollToBottom()
    }
  }, [messages, isLoading, chatWidgetOpen, scrollToBottom])

  React.useEffect(() => {
    if (chatPresetPrompt) {
      handleSendMessage(chatPresetPrompt)
      clearChatPrompt()
    }
  }, [chatPresetPrompt, clearChatPrompt, handleSendMessage])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && chatWidgetOpen) {
        setChatWidgetOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [chatWidgetOpen, setChatWidgetOpen])

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          "Hi! I'm the BuzzleMax AI assistant 👋\n\nWhat are you looking to build or automate?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setHasStarted(false)
  }

  const handleInChatLeadSubmit = async (messageId: string, e: React.FormEvent) => {
    e.preventDefault()
    if (!leadEmail.trim()) return

    setIsSubmittingLead(true)
    const success = await submitCapturedChatLead({
      name: leadName.trim() || 'Chat Visitor',
      email: leadEmail.trim(),
      requirement: leadReq.trim() || 'Inquired via BuzzleMax AI Sales Assistant',
    })

    setIsSubmittingLead(false)

    if (success) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId
            ? {
                ...m,
                showLeadForm: false,
                leadSubmitted: true,
              }
            : m
        )
      )
    }
  }

  const triggerHandoffToContactForm = (messageContent?: string) => {
    trackChatEvent('contact_cta_clicked')
    setPendingLeadData({
      requirement: messageContent || 'Requested consultation via AI Chat Assistant',
    })

    setChatWidgetOpen(false)

    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#contact'
    }
  }

  return (
    <>
      {/* Mobile Backdrop Overlay (only when chat is open on mobile) */}
      <AnimatePresence>
        {chatWidgetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setChatWidgetOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs sm:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        <AnimatePresence>
          {!chatWidgetOpen && unreadCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="mb-2 rounded-2xl border border-primary/30 bg-card text-card-foreground px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md"
            >
              1 new message 👋
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={() => setChatWidgetOpen(!chatWidgetOpen)}
          size="icon"
          aria-label={chatWidgetOpen ? 'Close AI Sales Assistant' : 'Open AI Sales Assistant'}
          aria-expanded={chatWidgetOpen}
          className={cn(
            'relative h-14 w-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95',
            chatWidgetOpen
              ? 'bg-muted text-foreground hover:bg-muted/80'
              : 'bg-primary text-primary-foreground shadow-primary/25'
          )}
        >
          {chatWidgetOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <Bot className="h-7 w-7" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500" />
              </span>
            </>
          )}
        </Button>
      </div>

      {/* Chat Panel Container */}
      <AnimatePresence>
        {chatWidgetOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'fixed z-50 flex flex-col overflow-hidden border border-border bg-card text-card-foreground shadow-2xl backdrop-blur-xl',
              // Desktop layout (floating popover)
              'sm:bottom-24 sm:right-5 sm:w-[410px] sm:max-w-[calc(100vw-2.5rem)] sm:h-[580px] sm:max-h-[calc(100vh-7rem)] sm:rounded-3xl',
              // Mobile layout (bottom sheet modal)
              'max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:h-[88vh] max-sm:max-h-[640px] max-sm:rounded-t-3xl max-sm:border-t'
            )}
            role="dialog"
            aria-label="BuzzleMax AI Sales Assistant Chat"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-muted/60 px-5 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Bot className="h-5 w-5" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold tracking-tight text-foreground">
                      BuzzleMax AI
                    </h3>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Online
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Your AI project assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setChatWidgetOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Chat Body & Message Stream */}
            <div className="flex flex-1 flex-col overflow-y-auto p-4 space-y-4 bg-background/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex flex-col gap-1',
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  )}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {msg.role === 'assistant' && (
                      <div className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}

                    <div
                      className={cn(
                        'rounded-2xl px-4 py-3 text-sm shadow-sm',
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted/90 text-foreground border border-border/60 rounded-bl-none'
                      )}
                    >
                      <SafeMarkdownText text={msg.content} isUser={msg.role === 'user'} />
                    </div>
                  </div>

                  <span className="px-2 text-[10px] text-muted-foreground">{msg.timestamp}</span>

                  {/* Inline Lead Capture Form */}
                  {msg.showLeadForm && !msg.leadSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="ml-9 mt-2 w-[92%] max-w-sm rounded-2xl border border-primary/25 bg-card p-4 shadow-md"
                    >
                      <h4 className="text-xs font-bold text-foreground mb-1 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-primary" /> Request BuzzleMax Follow-up
                      </h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        Share your details so our team can send a tailored proposal.
                      </p>

                      <form
                        onSubmit={(e) => handleInChatLeadSubmit(msg.id, e)}
                        className="space-y-2.5"
                      >
                        <Input
                          placeholder="Your Name"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="h-8 text-xs bg-background"
                          required
                        />
                        <Input
                          type="email"
                          placeholder="Your Work Email"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="h-8 text-xs bg-background"
                          required
                        />
                        <Input
                          placeholder="Project requirement / details (optional)"
                          value={leadReq}
                          onChange={(e) => setLeadReq(e.target.value)}
                          className="h-8 text-xs bg-background"
                        />

                        <div className="flex items-center gap-2 pt-1">
                          <Button
                            type="submit"
                            size="sm"
                            disabled={isSubmittingLead}
                            className="h-8 flex-1 text-xs font-semibold"
                          >
                            {isSubmittingLead ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              'Submit Details'
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => triggerHandoffToContactForm(msg.content)}
                            className="h-8 text-xs"
                          >
                            Use Contact Form <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Submission Confirmation Badge */}
                  {msg.leadSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-9 mt-1 flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>Thanks! Details received. BuzzleMax team will follow up soon.</span>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl bg-muted px-4 py-2.5 text-xs">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Chips */}
            <div className="border-t border-border bg-muted/30 px-3 py-2 shrink-0">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {!hasStarted
                  ? INITIAL_QUICK_ACTIONS.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => handleSendMessage(action.prompt)}
                        className="shrink-0 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-colors"
                      >
                        {action.label}
                      </button>
                    ))
                  : CONTEXTUAL_QUICK_ACTIONS.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => handleSendMessage(action.prompt)}
                        className="shrink-0 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-colors"
                      >
                        {action.label}
                      </button>
                    ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t border-border bg-card p-3 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex items-center gap-2"
              >
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask BuzzleMax AI..."
                  className="h-10 flex-1 rounded-xl text-sm bg-muted/40 border-border focus-visible:ring-primary"
                  disabled={isLoading}
                />

                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !inputValue.trim()}
                  className="h-10 w-10 shrink-0 rounded-xl font-semibold shadow-md"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
                <span>Final quotes shared after requirements review.</span>
                <button
                  onClick={() => triggerHandoffToContactForm()}
                  className="hover:underline text-primary font-medium"
                >
                  Contact Form
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatWidget