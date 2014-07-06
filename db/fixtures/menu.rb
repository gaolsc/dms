[
    ['康师傅老坛酸菜面', 'previews/test-1.jpg'],
    ['田老师红烧肉', 'previews/test-2.jpg'],
    ['土豆红烧肉', 'previews/test-3.jpg'],
    ['红烧排骨', 'previews/test-3.jpg'],
    ['猪肉炖粉条', 'previews/test-3.jpg'],
    ['西红柿炒鸡蛋', 'previews/test-3.jpg'],
    ['腊肉烧白菜', 'previews/test-3.jpg']
].each do |el|
  MenuItem.seed(:label) do |s|
    s.label = el[0]
    s.price = 3.5
    s.desc = '妈呀，这酸爽！'
    s.enabled = true
    s.preview_url = el[1]
  end
end