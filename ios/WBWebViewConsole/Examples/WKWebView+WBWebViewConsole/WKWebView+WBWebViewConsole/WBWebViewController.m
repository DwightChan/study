//
//  WBWebViewController.m
//  WKWebView+WBWebViewConsole
//
//  Created by 吴天 on 2/13/15.
//
//  Copyright (c) 2014-present, Weibo, Corp.
//  All rights reserved.
//
//  This source code is licensed under the BSD-style license found in the
//  LICENSE file in the root directory of this source tree.
//

#import "WBWebViewController.h"
#import "WBWKWebView.h"
#import <WBWebViewConsole/WBWebViewConsole.h>
#import <WBWebViewConsole/WBWebDebugConsoleViewController.h>

@interface WBWebViewController ()

@property (nonatomic, strong) WBWKWebView * webView;
@property (nonatomic, strong) UIButton * refreshBtn;

@end

@implementation WBWebViewController


- (UIButton *)refreshBtn {
    if (!_refreshBtn) {
        _refreshBtn = [[UIButton alloc] init];
        [_refreshBtn setTitle:@"刷新" forState:UIControlStateNormal];
        [_refreshBtn addTarget:self action:@selector(refreshBtnClick:) forControlEvents:UIControlEventTouchUpInside];
        return _refreshBtn;
    }
    return _refreshBtn;
}
- (void)refreshBtnClick:(UIButton *)sender {
    [self.webView reload];
}
- (void)viewDidLoad
{
    [super viewDidLoad];
  
    self.title = @"Browser";
    
    self.webView = [[WBWKWebView alloc] initWithFrame:self.view.bounds];
    self.webView.JSBridge.interfaceName = @"WKWebViewBridge";
    self.webView.JSBridge.readyEventName = @"WKWebViewBridgeReady";
    self.webView.JSBridge.invokeScheme = @"wkwebview-bridge://invoke";
    
    [self.view addSubview:self.webView];
    // 09-移动端拖动元素.html
//    NSString * path = [[NSBundle mainBundle] pathForResource:@"09moveEmentle" ofType:@"html"];
    NSString * path = [[NSBundle mainBundle] pathForResource:@"09moveEmentle" ofType:@"html"];
    [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
    
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"Console" style:UIBarButtonItemStylePlain target:self action:@selector(showConsole:)];
//      self.navigationController.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:self.refreshBtn];
    self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"刷新" style:UIBarButtonItemStylePlain target:self action:@selector(refreshBtnClick:)];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    
    [self webDebugAddContextMenuItems];
}

- (void)viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
    
    [self webDebugRemoveContextMenuItems];
}

- (void)showConsole:(id)sender
{
    WBWebDebugConsoleViewController * controller = [[WBWebDebugConsoleViewController alloc] initWithConsole:_webView.console];
    
    [self.navigationController pushViewController:controller animated:YES];
}

- (void)webDebugAddContextMenuItems
{
    UIMenuItem * item = [[UIMenuItem alloc] initWithTitle:@"Inspect Element" action:@selector(webDebugInspectCurrentSelectedElement:)];
    [[UIMenuController sharedMenuController] setMenuItems:@[item]];
}

- (void)webDebugRemoveContextMenuItems
{
    [[UIMenuController sharedMenuController] setMenuItems:nil];
}

- (void)webDebugInspectCurrentSelectedElement:(id)sender
{
    NSString * variable = @"WeiboConsoleLastSelection";
    
    [self.webView.console storeCurrentSelectedElementToJavaScriptVariable:variable completion:^(BOOL success) {
        if (success)
        {
            WBWebDebugConsoleViewController * consoleViewController = [[WBWebDebugConsoleViewController alloc] initWithConsole:self.webView.console];
            consoleViewController.initialCommand = variable;
            
            [self.navigationController pushViewController:consoleViewController animated:YES];
        }
        else
        {
            UIAlertView * alertView = [[UIAlertView alloc] initWithTitle:@"Can not get current selected element" message:nil delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
            [alertView show];
        }
    }];
}

@end
