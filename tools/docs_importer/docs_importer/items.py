import scrapy


class DocTopicItem(scrapy.Item):
  source = scrapy.Field()
  section = scrapy.Field()
  url = scrapy.Field()
  title = scrapy.Field()
  h1 = scrapy.Field()
  headings = scrapy.Field()
  summary = scrapy.Field()
  fetched_at = scrapy.Field()
