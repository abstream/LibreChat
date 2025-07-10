export const generateAgentSEO = (agentName: string, agentData: any) => {
  const formattedName = agentName.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${formattedName} | Omnexio`,
    description:
      agentData?.short_description ||
      agentData?.description ||
      `Interact with ${formattedName}, an advanced AI agent available on Omnexio. Get instant responses and powerful AI capabilities.`,
    keywords: `${formattedName}, ${agentData?.category || 'AI'}, artificial intelligence, Omnexio`,
    ogTitle: `${formattedName}`,
    ogDescription:
      agentData?.short_description ||
      `Experience the power of ${formattedName} AI agent on Omnexio`,
    ogImage: agentData?.imageUrl || '/assets/omnexio-logo.png',
  };
};

export const generateChatSEO = (conversationId: string) => {
  const isNewChat = conversationId === 'new';

  return {
    title: isNewChat ? 'New AI Chat - Omnexio' : `AI Conversation - Omnexio`,
    description: isNewChat
      ? 'Start a new conversation with advanced AI models. Get help with writing, coding, analysis, and creative tasks.'
      : 'Continue your AI conversation with powerful language models and AI assistants.',
    keywords: 'AI chat, new conversation, AI assistant, GPT, Claude, AI help',
  };
};
