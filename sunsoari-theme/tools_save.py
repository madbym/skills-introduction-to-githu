import json,sys,os,glob
# usage: python3 tools_save.py <dump.txt>  -> writes files under remote/
out='/home/user/skills-introduction-to-githu/sunsoari-theme/remote'
for p in sys.argv[1:]:
    d=json.load(open(p))
    for n in d['data']['theme']['files']['nodes']:
        fn=os.path.join(out,n['filename']); os.makedirs(os.path.dirname(fn),exist_ok=True)
        open(fn,'w').write(n['body']['content']); print('saved',n['filename'],len(n['body']['content']))
