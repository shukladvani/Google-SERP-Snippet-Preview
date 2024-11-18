import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Smartphone, Monitor, Download, Facebook, Twitter } from 'lucide-react';

const SerpPreviewTool = () => {
  const [title, setTitle] = useState('Your Page Title - Brand Name');
  const [url, setUrl] = useState('https://example.com/page-url');
  const [description, setDescription] = useState('Enter your meta description here. This is what will appear in Google search results. Make it compelling and include relevant keywords.');
  const [keywords, setKeywords] = useState('');
  const [highlightKeywords, setHighlightKeywords] = useState(true);
  const [image, setImage] = useState('/api/placeholder/1200/630');
  
  // Social Media Preview States
  const [fbTitle, setFbTitle] = useState('Facebook Share Title');
  const [fbDescription, setFbDescription] = useState('Compelling description for Facebook sharing');
  const [twitterTitle, setTwitterTitle] = useState('Twitter Share Title');
  const [twitterDescription, setTwitterDescription] = useState('Engaging tweet text for sharing');

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  };

  const highlightSearchTerms = (text, keywords) => {
    if (!keywords || !highlightKeywords) return text;
    
    const terms = keywords.toLowerCase().split(',').map(term => term.trim());
    let highlightedText = text;
    
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const exportData = () => {
    const data = {
      google: { title, url, description },
      facebook: { title: fbTitle, description: fbDescription, image },
      twitter: { title: twitterTitle, description: twitterDescription, image }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob); // Changed from 'url' to 'downloadUrl'
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'serp-preview-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl); // Use the new variable name here too
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Google SERP Snippet Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="google">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="google">Google SERP</TabsTrigger>
              <TabsTrigger value="facebook">Facebook</TabsTrigger>
              <TabsTrigger value="twitter">Twitter</TabsTrigger>
            </TabsList>

            <TabsContent value="google" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title Tag (50-60 characters)</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full"
                    maxLength={60}
                  />
                  <div className="text-sm text-gray-500">
                    {title.length}/60 characters
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Meta Description (150-160 characters)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full"
                    maxLength={160}
                    rows={3}
                  />
                  <div className="text-sm text-gray-500">
                    {description.length}/160 characters
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                    className="w-full"
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={highlightKeywords}
                      onCheckedChange={setHighlightKeywords}
                    />
                    <Label>Highlight Keywords</Label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> Desktop
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> Mobile
                </Button>
              </div>

              {/* Desktop Preview */}
              <Card className="mt-8 p-4">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-500">Desktop Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="text-xl text-blue-600 hover:underline cursor-pointer">
                      {highlightSearchTerms(truncateText(title, 60), keywords)}
                    </div>
                    <div className="text-sm text-green-700">
                      {url}
                    </div>
                    <div className="text-sm text-gray-600">
                      {highlightSearchTerms(truncateText(description, 160), keywords)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile Preview */}
              <Card className="mt-4 p-4 max-w-sm mx-auto">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-500">Mobile Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="text-lg text-blue-600 hover:underline cursor-pointer">
                      {highlightSearchTerms(truncateText(title, 50), keywords)}
                    </div>
                    <div className="text-xs text-green-700">
                      {url}
                    </div>
                    <div className="text-xs text-gray-600">
                      {highlightSearchTerms(truncateText(description, 130), keywords)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facebook" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fb-title">Facebook Title</Label>
                  <Input
                    id="fb-title"
                    value={fbTitle}
                    onChange={(e) => setFbTitle(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fb-description">Facebook Description</Label>
                  <Textarea
                    id="fb-description"
                    value={fbDescription}
                    onChange={(e) => setFbDescription(e.target.value)}
                    className="w-full"
                    rows={3}
                  />
                </div>
                <Card className="p-4">
                  <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                      <img src={image} alt="Facebook preview" className="w-full h-48 object-cover" />
                      <div className="p-4 bg-gray-100">
                        <div className="text-lg font-bold">{fbTitle}</div>
                        <div className="text-sm text-gray-600">{fbDescription}</div>
                        <div className="text-xs text-gray-500 mt-2">{url}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="twitter" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter-title">Twitter Title</Label>
                  <Input
                    id="twitter-title"
                    value={twitterTitle}
                    onChange={(e) => setTwitterTitle(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter-description">Twitter Description</Label>
                  <Textarea
                    id="twitter-description"
                    value={twitterDescription}
                    onChange={(e) => setTwitterDescription(e.target.value)}
                    className="w-full"
                    rows={2}
                  />
                </div>
                <Card className="p-4">
                  <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                      <img src={image} alt="Twitter preview" className="w-full h-48 object-cover" />
                      <div className="p-4 bg-gray-100">
                        <div className="text-base font-bold">{twitterTitle}</div>
                        <div className="text-sm text-gray-600">{twitterDescription}</div>
                        <div className="text-xs text-gray-500 mt-2">{url}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4">
            <Button onClick={exportData} className="flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SerpPreviewTool;